import webpack from 'webpack-stream'

/**
 * @file Module of javascript processing
 * @module tasks/js
 *
 * @requires webpack-stream
 *
 * @exports js
 */

/**
 * @function js
 * @desc Processing all js files from [./src/js]{@link module:configs/path.path.src} and deploying in [./dist/js]{@link module:configs/path.path.build}
 */
export const js = () =>
    /**
     * @event processJS
     * @desc Event of processing js files
     * @see [js]{@link module:tasks/js~js}
     */
    app.gulp.src(app.path.src.js, { sourcemaps: app.isDev })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "JS",
                message: "Error <%= error.message %>"
            }))
        )
        .pipe(webpack({
            mode: app.isBuild ? 'production' : 'development',
            devtool: 'source-map',
            target: ['web', 'es2017'],
            entry: {
                app: `${app.path.src.jsDir}/app.js`,
            },
            output: {
                filename: '[name].min.js',
            }
        }))
        .pipe(app.gulp.dest(app.path.build.js))
        .pipe(app.plugins.browsersync.stream())