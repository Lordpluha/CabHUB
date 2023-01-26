// PROD plugins
import webp from "gulp-webp";
import imagemin from "gulp-imagemin";
import pngquant from "imagemin-pngquant";
import svgSprite from "gulp-svg-sprite";

/**
 * @module tasks/images
 * @requires gulp-webp
 * @requires gulp-imagemin
 * @requires imagemin-pngquant
 *
 * @exports images
 * @exports svgSprites
 */

/**
 * @function images
 * @desc Processing and creating .webp copies of all images from [./src/img]{@link module:configs/path.path.src} to [./dist/img]{@link module:configs/path.path.build}
 * @version 1.0.0
 */
export const images = () => {
    /**
     * @event processImages
     * @desc Event of images processing
     * @see [images]{@link module:tasks/images~images}
     */

    /**
     * @type {object}
     * @desc Config for [gulp-imagemin]{@link https://www.npmjs.com/package/gulp-imagemin}
     * @prop {boolean} progressive Minify jped lossless
     * @prop {boolean} interlaced interlaced gif for render
     * @prop {number} quality quality of images after optimization
     * @prop {number} optimizationLevel level of images optimization *from 0 to 7
     * @prop {boolean} silent Don't log the number of images that have been minified
     * @prop {boolean} verbose Enabling this will log info on every image passed to [gulp-imagemin]{@link https://www.npmjs.com/package/gulp-imagemin}
     */
    const imagemin_cfg = {
        progressive: true,
        interlaced: true,
        quality: 100,
        optimizationLevel: 3,
        silent: app.isBuild ? 'true' : 'false',
        verbose: app.isBuild ? 'false' : 'true'
    }
    
    return app.gulp.src(app.path.src.images)
        .pipe(app.plugins.newer(app.path.build.images))
        .pipe(
            app.plugins.if(
                app.isBuild,
                webp()
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                app.gulp.dest(app.path.build.images)
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                app.gulp.src(app.path.src.images)
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                app.plugins.newer(app.path.build.images)
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                imagemin(imagemin_cfg)
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                imagemin([pngquant()], imagemin_cfg)
            )
        )
        .pipe(app.gulp.dest(app.path.build.images))

        .pipe(app.gulp.src(app.path.src.svgs))
        .pipe(app.gulp.dest(app.path.build.images))
        .pipe(app.plugins.browsersync.stream());
}
/**
 * @function svgSprites
 * @desc .svg processing function
 */
export function svgSprites() {
    /**
     * @event svgSprites
     * @desc .svg processing event
     * @see [svgSprites]{@link module:tasks/images~svgSprites}
     */
    return app.gulp.src(app.path.src.svgs)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "SVG",
                message: "Error <%= error.message %>"
            }))
        )
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: '../icons/icons.svg',
                    example: true
                }
            }
        }))
        .pipe(app.gulp.dest(app.path.build.images));
}