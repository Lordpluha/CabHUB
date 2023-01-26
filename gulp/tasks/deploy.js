import { config } from '../configs/ftp.js';
import vinylFTP from 'vinyl-ftp';
import util from 'gulp-util';

/**
 * @file Files deploy module
 * @module tasks/deploy
 *
 * @requires module:configs/ftp.config
 * @requires vinyl-ftp
 * @requires gulp-util
 *
 * @exports FtpUpload
 */

/**
 * @function FtpUpload
 * @desc Ftp files deploy func
 */
export function FtpUpload() {
	/**
	 * @event FtpUpload
	 * @desc Event of ftp files deploy
	 * @see [FtpUpload]{@link module:tasks/deploy~FtpUpload}
	 */
	config.log = util.log;
	const ftpConnect = vinylFTP.create(config);
	return app.gulp.src(`${app.path.buildFolder}/**/*.*`, {})
		.pipe(app.plugins.plumber(
			app.plugins.notify.onError({
				title: "FTP",
				message: "Error <%= error.message %>"
			})
		))
		.pipe(ftpConnect.dest(`/${app.path.ftp}/${app.path.rootFolder}`));
}