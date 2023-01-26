import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';

// @ts-check

/**
 * @file Fonts processing module
 * @module tasks/fonts
 *
 * @requires gulp-fonter
 * @requires gulp-ttf2woff2
 *
 * @exports otfToTtf
 * @exports ttfToWoff
 * @exports ttfToWoff2
 * @exports fontsStyle
 * @exports fontsCp
 */

/**
 * @function otfToTtf
 * @desc Fonts convert from .otf to .ttf in [./src/fonts]{@link module:configs/path.path.src}
 * @example otfToTtf();
 */
export const otfToTtf = () => {
    /**
     * @event otfToTtf
     * @desc Event of fonts converting from .otf to .ttf
     * @see [otfToTtf]{@link module:tasks/fonts~otfToTtf}
     */
    return app.gulp.src(`${app.path.src.fontsDir}/**/*.otf`)
        .pipe(app.plugins.newer(app.path.src.fontsDir))
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(app.gulp.dest(app.path.src.fontsDir));
}

/**
 * @function ttfToWoff
 * @desc Fonts convert from .ttf to .woff in [./src/fonts]{@link module:configs/path.path.src}
 * @example ttfToWoff();
 */
export const ttfToWoff = () => {
    /**
     * @event ttfToWoff
     * @desc Event of fonts converting from .ttf to .woff
     * @see [ttfToWoff]{@link module:tasks/fonts~ttfToWoff}
     */
    return app.gulp.src(`${app.path.src.fontsDir}/**/*.ttf`)
        .pipe(app.plugins.newer(app.path.src.fontsDir))
        .pipe(fonter({
            formats: ['woff']
        }))
        .pipe(app.gulp.dest(app.path.src.fontsDir));
}

/**
 * @function ttfToWoff2
 * @desc Fonts convert from .ttf to .woff2 in [./src/fonts]{@link module:configs/path.path.src}
 * @example ttfToWoff2();
 */
export const ttfToWoff2 = () => {
    /**
     * @event ttfToWoff2
     * @desc Event of fonts converting from .ttf to .woff2
     * @see [ttfToWoff2]{@link module:tasks/fonts~ttfToWoff2}
     */
    return app.gulp.src(`${app.path.src.fontsDir}/**/*.ttf`)
        .pipe(app.plugins.newer(app.path.src.fontsDir))
        .pipe(ttf2woff2())
        .pipe(app.gulp.dest(app.path.src.fontsDir));
}

/**
 * @function getScssData
 * @package
 * @desc Getting styles code from [./src/scss/*.scss]{@link module:configs/path.path.src} except _fonts.scss
 * @returns {string} scss code
 *
 * @example var variable = getScssData();
 */
function getScssData () {
    let files = app.plugins.fs.readdirSync(app.path.src.scssDir, function(){});
    let scssData = '';
    for (let i in files) {
        if (files[i] != app.path.src.fontScss) {
            scssData += app.plugins.fs.readFileSync(app.path.src.scssDir+'/'+files[i], 'utf-8');
        }
    }
    return scssData;
}

/**
 * @function DirWalk
 * @package
 * @version 1.0.1
 * @desc Recursive applying optional function func() to all font files
 *
 * @param {data_dir} dir scan start dir
 * @param {object} data object for messaging between DirWalk and func()
 * @param {function} func function for processing font files
 *
 * @example DirWalk(dir, Obj, function (data=Data) { // your code })
 */
function DirWalk (dir, data, func) {
    data.files_ = data.files_ || [];
    let files = app.plugins.fs.readdirSync(dir, () => { });

    for (let i in files) {
        let name = `${dir}/${files[i]}`;
        if (app.plugins.fs.statSync(name).isDirectory()){
            DirWalk(name, data, func);
        } else {
            data.files_.push(name);
            let file_name_split = files[i].split('.');

            let file_name = file_name_split[0];
            let file_ext = file_name_split[1];

            // Sending arg by using object Data
            data.file_ext = file_ext;
            data.file_name = file_name;
            data.dir = dir;
            data.name = name;

            // Cheking file extension
            if (["ttf","woff","woff2","otf","eot","eot?#iefix"].includes(file_ext)) {
                func();
            }
        }
    }
}

/**
 * @typedef data_dir
 * @desc Property StringLike of object data
 */

/**
 * @function checkFontParams
 * @package
 * @desc Function for check font params from his name
 *
 * @param {string} file_name file name, which include font style and weight type
 *
 * @return {list} [font_style, font_weight]
 *
 * @example let [font_style, font_weight] = checkFontParams(file_name);
 */
function checkFontParams (file_name) {
    let font_weight = 'normal';
    let font_style = 'normal';
    if (file_name.includes('Italic') || file_name.includes('italic')) {
        font_style = 'italic';
    }
    if (file_name.includes('Thin') || file_name.includes('thin')) {
        font_weight = 100;
    } else if (file_name.includes('Light') || file_name.includes('light')) {
        font_weight = 300;
        if (file_name.includes('Extra') ||
            file_name.includes('extra') ||
            file_name.includes('Ultra') ||
            file_name.includes('ultra')) {
            font_weight = 200;
        }
    } else if (file_name.includes('Normal') ||
                file_name.includes('normal') ||
                file_name.includes('Regular') ||
                file_name.includes('regular')) {
        font_weight = 400;
    } else if (file_name.includes('Medium') || file_name.includes('medium')) {
        font_weight = 500;
    } else if (file_name.includes('Bold') || file_name.includes('bold')) {
        font_weight = 700;
        if (file_name.includes('Semi') ||
            file_name.includes('semi') ||
            file_name.includes('Demi') ||
            file_name.includes('demi')) {
            font_weight = 600;
        } else if (file_name.includes('Extra') ||
                    file_name.includes('extra') ||
                    file_name.includes('Ultra') ||
                    file_name.includes('ultra')) {
            font_weight = 800;
        }
    } else if (file_name.includes('Black') ||
                file_name.includes('black') ||
                file_name.includes('Heavy') ||
                file_name.includes('heavy')) {
        font_weight = 900;
        if (file_name.includes('Extra') ||
            file_name.includes('extra') ||
            file_name.includes('Ultra') ||
            file_name.includes('ultra')) {
            font_weight = 950;
        }
    } else if (file_name.includes('Bolder') || file_name.includes('bolder')) {
        font_weight = 1000;
    }
    return [font_style, font_weight];
}

/**
 *
 * @function fontsStyle
 * @desc Function, which writing used font in scss code by using mixin font() from _mixins.scss in _fonts.scss throught [DirWalk]{@link module:tasks/fonts~DirWalk}
 * @version 1.0.1
 * @param {functionCallback} done default callback function
 * @example fontsStyle();
 * done();
*/
export const fontsStyle = (done) => {
    /**
     * @event fontsStyle
     * @desc Event of writing fonts in scss
     * @see [fontsStyle]{@link module:tasks/fonts~fontsStyle}
     */
    /**
     * @namespace
     * @private
     * @type {object}
     * @prop {string} dir - [source fonts dir]{@link module:configs/path.path.src}
     */
    var Data = {
        dir: app.path.src.fontsDir
    };
    /**
     * @namespace
     * @private
     * @type {object}
     */
    var out = {};
    app.plugins.fs.writeFileSync(app.path.src.fontsScss, '');
    DirWalk(Data.dir, Data, function(data=Data) {
        // Checking font for using in scss code
        if (getScssData().includes(data.file_name)) {
            /**
             * @desc Dir with current files
             * @private
             */
            let final_dir = data.dir.replace(/\/src/gi, '.');

            if (out[data.file_name] == undefined) {
                out[data.file_name] = {};
                out[data.file_name][final_dir] = [];
            }
            out[data.file_name][final_dir].push(data.file_ext);
        }
    });

    // Writing fonts in _fonts.scss
    for (let font_name in out) {
        for (let font_dir in out[font_name]) {
            let [font_style, font_weight] = checkFontParams(font_name);
            app.plugins.fs.appendFileSync(app.path.src.fontsScss, `@include font('${font_name}', '${font_dir}', ${font_weight}, ${font_style}, '${out[font_name][font_dir].join('\', \'')}');\n`);
        }
    }

    done();
}
/**
 * @callback functionCallback
 * @desc Callback function
 */

/**
 * @function fontsCp
 * @desc Function of copying from [./src/fonts]{@link module:configs/path.path.src} to [./dist/fonts]{@link module:configs/path.path.build}
 * @param {functionCallback} done default callback function
 * @example fontsCp();
 */
export const fontsCp = (done) => {
    /**
     * @event fontsCp
     * @desc Event of copying fonts
     * @see [fontsCp]{@link module:tasks/fonts~fontsCp}
     */
    /**
     * @namespace
     * @private
     * @type {Object}
     * @prop {string} dir - [source fonts dir]{@link module:configs/path.path.src}
     */

    var Data = {
        dir: app.path.src.fontsDir
    };
    app.plugins.fs.mkdirSync(app.path.build.fonts, { recursive: true });
    DirWalk(Data.dir, Data, function(data=Data) {
        // Cheking for using font in code
        if (getScssData().includes(data.file_name)) {
            let dest_folder_name = data.dir.split('/');
            dest_folder_name = dest_folder_name[dest_folder_name.length-1];
            app.gulp.src(data.name)
                .pipe(app.gulp.dest(app.path.build.fonts+'/'+dest_folder_name));
        }
    });
    done();
}
