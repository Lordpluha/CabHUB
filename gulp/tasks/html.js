import fileinclude from "gulp-file-include"
import htmlBemVadlidator from "gulp-html-bem-validator"
import webpHtml from "gulp-html-img-wrapper"
import versionNumber from "gulp-version-number"
import htmlMin from "gulp-htmlmin"
import prettify from "gulp-html-prettify"

/**
 * @file Module of processing all html files of project
 * @module tasks/html
 *
 * @requires gulp-file-include
 * @requires gulp-html-img-wrapper
 * @requires gulp-version-number
 * @requires gulp-html-bem-validator
 * @requires gulp-htmlmin
 *
 * @exports html
 */

/**
 * @function html
 * @desc Processing and deploying in [./dist/]{@link module:configs/path.path.build} all html from [./src/html]{@link module:configs/path.path.src}
 * @version 1.0.0
 */
export const html = () => {
    /**
     * @event processHtml
     * @desc Event of processing html
     * @see [html]{@link module:tasks/html~html}
     */
    return app.gulp.src(
            app.MainFileType == 'php'
            ? [app.path.src.html, app.path.src.php]
            : app.path.src.html
        )
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "HTML",
                message: "Error <%= error.message %>"
            }))
        )
        .pipe(fileinclude({
            context: {
                isBuild: app.isBuild,
                isDev: app.isDev
            }
        }))

        // <img src="@img/..." alt="">
        .pipe(app.plugins.replace(/@img\//g, 'img/'))
        .pipe(
            app.plugins.if(
                app.isBuild,
                webpHtml({
                    logger: app.isDev ? true : false
                })
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                prettify({indent_char: ' ', indent_size: 4})
            )
        )
        .pipe(
            app.plugins.if(
                app.isDev,
                htmlBemVadlidator()
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                versionNumber({
                    'value': '%DT%',
                    'append': {
                        'key': '_v',
                        'cover': 0,
                        'to': [
                            'css',
                            'js'
                        ]
                    },
                    'output': {
                        'file': 'gulp/version.json'
                    }
                })
            )
        )
        .pipe(app.gulp.dest(app.path.build.html))
        .pipe(
            app.plugins.if(
                app.isBuild,
                htmlMin({
                    collapseWhitespace: true,
                    html5: true,
                    removeComments: true,
                    useShortDoctype: true
                })
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                app.plugins.rename({suffix: ".min"})
            )
        )
        .pipe(
            app.plugins.if(
                app.isBuild,
                app.gulp.dest(app.path.build.html)
            )
        )
        .pipe(app.plugins.browsersync.stream())
}