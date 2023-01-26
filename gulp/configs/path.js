import * as nodePath from 'path';

/**
 * @file All project pathes
 * @module configs/path
 * @requires path
 * @exports [path]{@link path}
 */

/**
 * @const
 * @package
 * @desc Root folder name
 */
const rootFolder = nodePath.basename(nodePath.resolve());
/**
 * @const
 * @package
 * @defaultvalue
 * @desc Source folder name
 */
const srcFolder = './src';
/**
 * @const
 * @package
 * @defaultvalue
 * @desc Destination/Build folder name
 */
const buildFolder = './dist';
/**
 * @const
 * @package
 * @defaultvalue
 * @desc Html folder name
 */
const srcHtmlFolder = 'html';
/**
 * @const
 * @package
 * @defaultvalue
 * @desc Images folder name
 */
const imgFolder = 'img';
/**
 * @const
 * @package
 * @defaultvalue
 * @desc CSS folder name
 */
const CssFolder = 'css';
/**
 * @const
 * @package
 * @defaultvalue
 * @desc SCSS folder name
 */
const scssFolder = 'scss';
/**
 * @const
 * @package
 * @defaultvalue
 * @desc Fonts folder name
 */
const fontsFolder = 'fonts';
/**
 * @const
 * @package
 * @defaultvalue
 * @desc SCSS fonts file name
 */
const fontsScss = '_fonts.scss';
/**
 * @const
 * @package
 * @defaultvalue
 * @desc Javascript folder name
 */
const jsFolder = 'js';
/**
 * @const
 * @package
 * @defaultvalue
 * @desc Certification folder name
 */
const certFolder = 'certs';
/**
 * @const
 * @package
 * @desc Name of certificate
 */
const cert = 'localhost.pem';
/**
 * @const
 * @package
 * @desc Name of certificate key
 */
const key = 'localhost-key.pem';

//

/**
 * @const
 * @namespace
 * @desc All project pathes
 */
export const path = {
    /**
     * @memberof module:configs/path.path
     * @type {object}
     * @desc Destination/Build folder pathes
     * @prop {string} html html destination/build folder path
     * @prop {string} images images destination/build folder path
     * @prop {string} css styles destination/build folder path
     * @prop {string} js javascript destination/build folder path
     * @prop {string} fonts fonts destination/build folder path
     * @prop {string} certs certificates destination/build folder path
     * @prop {string} key current key destination/build file path
     * @prop {string} cert current certificate destination/build file path
     */
    build: {
        html:   `${buildFolder}`,
        images: `${buildFolder}/${imgFolder}`,
        css:    `${buildFolder}/${CssFolder}`,
        js:     `${buildFolder}/${jsFolder}`,
        fonts:  `${buildFolder}/${fontsFolder}`,
        certs:  `${buildFolder}/${certFolder}`,
        key:    `${buildFolder}/${certFolder}/${key}`,
        cert:   `${buildFolder}/${certFolder}/${cert}`
    },
    /**
     * @memberof module:configs/path.path
     * @type {object}
     * @desc Source folder pathes
     * @prop {string} html all html source files path
     * @prop {string} php all php source files path
     * @prop {string} images all images source files path
     * @prop {string} svgs all svgs source files path
     * @prop {string} scssDir scss source folder path
     * @prop {string} scss all scss source files path
     * @prop {string} fontsDir fonts source folder path
     * @prop {string} fonts all fonts source files path
     * @prop {string} fontsScss fonts styles source files path
     * @prop {string} js all javascript source files path
     * @prop {string} certs all certificates source files path
     */
    src: {
        html:      `${srcFolder}/${srcHtmlFolder}/*.html`,
        php:       `${srcFolder}/${srcHtmlFolder}/*.php`,
        images:    `${srcFolder}/${imgFolder}/**/*.{jpeg,jpg,png,gif,webp}`,
        svgs:      `${srcFolder}/${imgFolder}/**/*.svg`,
        scssDir:   `${srcFolder}/${scssFolder}/`,
        scss:      `${srcFolder}/${scssFolder}/**/*.{scss,map.scss}`,
        fontsDir:  `${srcFolder}/${fontsFolder}`,
        fonts:     `${srcFolder}/${fontsFolder}/**/*.{eot,ttf,otf,woff,woff2,eot?#iefix}`,
        fontsScss: `${srcFolder}/${scssFolder}/${fontsScss}`,
        js:        `${srcFolder}/${jsFolder}/app.js`,
        certs:     `${srcFolder}/${certFolder}/**/*.{pem,key,cert}`
    },
    /**
     * @memberof module:configs/path.path
     * @type {object}
     * @desc [Files watcher]{@link module:gulpfile.js~wathcer} pathes
     * @prop {string} images all watcher images files path
     * @prop {string} scss all watcher scss files path
     * @prop {string} html all watcher html files path
     * @prop {string} js all watcher js files path
     */
    watch: {
        images: `${srcFolder}/${imgFolder}/**/*.{jpg,jpeg,png,gif,webp,svg,ico}`,
        scss: [`${srcFolder}/${scssFolder}/**/*.scss`, `!${srcFolder}/${scssFolder}/**/_fonts.scss`],
        html: `${srcFolder}/${srcHtmlFolder}/**/*.html`,
        js: `${srcFolder}/${jsFolder}/**/*.js`
    },
    /**
     * @memberof module:configs/path.path
     * @type {string}
     * @desc Destination/Build folder name
     */
    buildFolder: buildFolder,
    /**
     * @memberof module:configs/path.path
     * @type {string}
     * @desc Source folder name
     */
    srcFolder: srcFolder,
    /**
     * @memberof module:configs/path.path
     * @type {string}
     * @desc Root folder name
     */
    rootFolder: rootFolder,
    /**
     * @memberof module:configs/path.path
     * @type {string}
     * @desc FTP deploy sever folder name
     */
    ftp: ``
}