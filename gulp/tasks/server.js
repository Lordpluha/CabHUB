/**
 * @file Module for working with localhost
 * @module tasks/server
 *
 * @requires browser-sync
 *
 * @exports server
 * @exports CpCerts
 */

/**
 * @function CpCerts
 * @desc Function for copying certificates from [./src/certs]{@link module:configs/path.path.src} into [./src/dist]{@link module:configs/path.path.build}
 */
export function CpCerts() {
	/**
	 * @event CpCerts
	 * @desc Event of copying certificates
	 * @see [CpCerts]{@link module:tasks/server~CpCerts}
	 */
	return app.gulp.src(app.path.src.certs)
		.pipe(app.gulp.dest(app.path.build.certs));
}

/**
 * @function server
 * @desc Function of starting and working of local server from [./dist/html]{@link module:configs/path.path.build}
 * @version 1.0.0
 *
 * @param {functionCallback} done
 *
 * @example server();
 */
export const server = (done) => {
	/**
	 * @event server
	 * @desc Event of starting local server
	 * @see [server]{@link module:tasks/server~server}
	 */
    const ProjectName = app.path.rootFolder;
    const OSPanel = false;
    const https = false;

    var browsersync_conf = {
		injectChanges: true,
		watch: true,
		// Sync of all devices and them action
		ghostMode: {
			clicks: true,
			forms: true,
			scroll: true
		},
		scrollProportionally: true,
		codeSync: true,

		reloadOnRestart: true,
        // debug || info
		logLevel: 'info',
		logPrefix: ProjectName,
		logConnections: true,
		logFileChanges: true,

		open: true,
		notify: true,
		timestamps: true,
		online: true,
		minify: false
	}

    // OS Panel on/off checking
	if (OSPanel == true) {
		browsersync_conf.proxy = ProjectName;
		browsersync_conf.port = 3000;

		// Check main file type
		if (app.MainFileType == 'php') {
			browsersync_conf.serveStatic = [
				`${app.path.build.php}`,
				`${app.path.buildFolder}`
			];
		} else {
			browsersync_conf.serveStatic = [
				`${app.path.src.html}`,
				`${app.path.srcFolder}`
			];
		}

	} else {
		browsersync_conf.server = {
			baseDir: `${app.path.build.html}`
		};
	}

    // Https on/off check
	if (https == true) {
		browsersync_conf.https = {
			key: `${app.path.build.key}`,
			cert:`${app.path.build.cert}`
		};

	}
    app.plugins.browsersync.init(browsersync_conf);
}

/**
 * @callback functionCallback
 * @desc Callback function
 */