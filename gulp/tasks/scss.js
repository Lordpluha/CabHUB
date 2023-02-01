// DEV
import dartSass from 'sass';
import gulpSass from 'gulp-sass';

// PROD
import webpcss from 'gulp-webpcss';
import cleanCss from 'gulp-clean-css';
import autoprefixer from 'gulp-autoprefixer';
import groupCssMediaQueries from 'gulp-group-css-media-queries';

/**
 * @file Module for processing style files
 * @module tasks/scss
 *
 * @requires sass
 * @requires gulp-sass
 * @requires gulp-webpcss
 * @requires gulp-clean-css
 * @requires gulp-autoprefixer
 * @requires gulp-group-css-media-queries
 *
 * @exports scss
 */

/**
 * @function sass
 * @desc Function to initialize and interact with API of [gulp-sass]{@link https://www.npmjs.com/package/gulp-sass}
 * @package
 * @example sass();
 */
const sass = gulpSass(dartSass);

/**
 * @function scss
 * @desc Function for processing all style files from [./src/scss]{@link module:configs/path.path.src} and deploying into [./dist/css]{@link module:configs/path.path.build}
 * @version 1.0.0
 * @example scss();
 */
export const scss = () => {
    /**
     * @event processScss
     * @desc Event of processing all styles
     * @see [scss]{@link module:tasks/scss~scss}
     */
    return app.gulp.src(app.path.src.scss, { sourcemaps: app.isDev })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SCSS",
                message: "Error <%= error.message %>"
            }))
        )
        .pipe(app.plugins.replace(/@img\//g, '../img/'))
        .pipe(app.plugins.if(
            app.isDev,
            app.plugins.sourcemaps.init())
        )
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(
            app.plugins.if(
                app.isBuild,
                groupCssMediaQueries()
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                webpcss({
                    webpClass: '.webp',
                    noWebpClass: '.no-webp'
                })
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                autoprefixer({
                    grid: true,
                    overrideBrowserlist: ["last 3 versions"],
                    cascade: true
                })
            )
        )
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(
            app.plugins.if(
                app.isBuild,
                cleanCss()
            )
        )
        .pipe(app.plugins.rename({extname: '.min.css'}))
        .pipe(app.plugins.if(
            app.isDev,
            app.plugins.sourcemaps.write('./'))
        )
        .pipe(app.gulp.dest(app.path.build.css))
        .pipe(app.plugins.browsersync.stream())
}