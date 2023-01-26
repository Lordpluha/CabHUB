'use strict';
/**
 * @author Lordpluha <Tesluakevlad@gmail.com>
 * @file Main project file
 * @version 1.0.0
 *
 * @requires gulp
 * @requires typescript
 * @requires jsdoc
 *
 * @requires configs/plugins
 * @requires configs/path
 *
 * @requires tasks/clean~cleanBuild
 * @requires tasks/scss~scss
 * @requires tasks/html~html
 * @requires tasks/images~images
 * @requires tasks/images~svgSprites
 * @requires tasks/js~js
 * @requires tasks/server~server
 * @requires tasks/server~CpCerts
 * @requires tasks/fonts~otfToTtf
 * @requires tasks/fonts~ttfToWoff
 * @requires tasks/fonts~ttfToWoff2
 * @requires tasks/fonts~fontsStyle
 * @requires tasks/fonts~fontsCp
 * @requires tasks/zip~ZipBuild
 * @requires tasks/deploy~FtpUpload
 *
 * @exports dev
 * @exports prod
 *
 * @todo ▶ Добавить bower вместо npm (@since 2.0.0)
 * @todo ▶ <b>{@link module:tasks/uploads}</b>Сделать функции для выгрузки файлов на другие типы удаленных файловых систем
 *
 * @copyright Teslyuk Vlad 2020
 * @license GNU
 */

import gulp from 'gulp';
import { path } from "./gulp/configs/path.js";
import { plugins } from "./gulp/configs/plugins.js";

/**
 * @global
 * @type {object}
 * @prop {boolean} isBuild process argument includes --build
 * @prop {boolean} isDev process argument dosen`t include --build
 * @prop {plugin} gulp [gulp]{@link https://www.npmjs.com/package/gulp}
 * @prop {object} path [more about path]{@link module:configs/path}
 * @prop {object} plugins [more about plugins]{@link module:configs/plugins}
 * @prop {string} MainFileType controll [file processing]{@link module:tasks/html} and [serving]{@link module:tasks/server} methods (html/php)
 */
global.app = {
    isBuild: process.argv.includes('--build'),
    isDev: !process.argv.includes('--build'),
    gulp: gulp,
    path: path,
    plugins: plugins,
    /**
     * @defaultvalue
     * @desc 'php'/'html'
     */
    MainFileType: 'html'
}

import { cleanBuild } from "./gulp/tasks/clean.js";
import { scss } from "./gulp/tasks/scss.js";
import { html } from "./gulp/tasks/html.js";
import { images, svgSprites } from "./gulp/tasks/images.js";
import { js } from "./gulp/tasks/js.js";
import { CpCerts, server } from "./gulp/tasks/server.js";
import { otfToTtf, ttfToWoff, ttfToWoff2, fontsStyle, fontsCp } from "./gulp/tasks/fonts.js";
import { ZipBuild } from "./gulp/tasks/zip.js";
import { FtpUpload } from "./gulp/tasks/deploy.js";

/**
 * @function watcher
 * @desc Files wathcer
 * @fires processScss
 * @fires processHtml
 * @fires processImages
 * @fires processJS
 */
function watcher() {
    /**
     * @event watchFiles
     * @desc Событие наблюдения за файлами .scss, .html, картинками и .js
     */
    gulp.watch(path.watch.scss, scss);
    gulp.watch(path.watch.html, html);
    gulp.watch(path.watch.images, images);
    gulp.watch(path.watch.js, js);
}

/**
 * @function fonts
 * @async
 *
 * @desc Fonts Processing func
 *
 * @event FontsProcess
 *
 * @fires otfToTtf
 * @fires ttfToWoff
 * @fires ttfToWoff2
 * @fires fontsStyle
 * @fires fontsCp
 */
const fonts = gulp.series(otfToTtf, gulp.parallel(ttfToWoff, ttfToWoff2), fontsStyle, fontsCp);

/**
 * @function FilesProcess
 * @async
 *
 * @desc Files Processing func
 *
 * @event FilesProcess
 *
 * @fires FontsProcess
 * @fires processScss
 * @fires processHtml
 * @fires processImages
 * @fires processJS
 */
const FilesProcess = gulp.parallel(fonts, scss, images, svgSprites, html, js);

/**
 * @function dev
 * @async
 *
 * @desc Switch to dev mode func
 *
 * @event StartDev
 *
 * @fires cleanBuild
 * @fires watchFiles
 * @fires CpCerts
 * @fires server
 * @fires FilesProcess
 */
const dev = gulp.series(cleanBuild, FilesProcess, gulp.parallel(watcher, gulp.series(CpCerts, server)));

/**
 * @function prod
 * @desc Swhitch to production mode func
 * @event StartProduction
 *
 * @fires cleanBuild
 * @fires FilesProcess
 */
const prod = gulp.series(cleanBuild, FilesProcess);

/**
 * @desc Production mode UI
 * @fires StartProduction
 */
gulp.task('prod', prod);

/**
 * @desc Developement mode UI
 * @fires StartDev
 */
gulp.task('default', dev);

/**
 * @desc Archivate UI
 * @fires cleanBuild
 * @fires FilesProcess
 * @fires ZipBuild
 */
gulp.task('zip', gulp.series(cleanBuild, FilesProcess, ZipBuild));

/**
 * @desc Project deploy UI
 * @fires cleanBuild
 * @fires FilesProcess
 * @fires ZipBuild
 * @fires FtpUpload
 */
gulp.task('deploy', gulp.series(cleanBuild, FilesProcess, ZipBuild, FtpUpload));

export { dev };
export { prod };

/**
 * @typedef plugin
 * @desc npm module or external plugin
 */