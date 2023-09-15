/**
 * @desc This file is for functions for other-fiiles processing
 * @see app.path.src.copyFiles
 */

const copyFiles = () => app.gulp.src(app.path.src.copyFiles)
	.pipe(app.gulp.dest(app.path.buildFolder))

export default copyFiles