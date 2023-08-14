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
export const server = done => {
	/**
	 * @event server
	 * @desc Event of starting local server
	 * @see [server]{@link module:tasks/server~server}
	 */
    const ProjectName = app.path.rootFolder,
		OSPanel = true,
		https = true

    const browsersync_conf = {
		// ui: app.isDev ? true : false,
		localOnly: app.isBuild ? false : true,
		injectChanges: true,
		watch: true,
		// Sync of all devices and them action
		ghostMode: {
			clicks: app.isDev ? true : false,
			forms: app.isDev ? true : false,
			scroll: app.isDev ? true : false
		},
		scrollProportionally: true,
		codeSync: true,
		reloadOnRestart: true,

		logLevel: app.isDev ? 'debug' : 'silent',
		logPrefix: ProjectName,
		logConnections: app.isBuild ? false : true,
		logFileChanges: app.isBuild ? false : true,

		open: true,
		notify: app.isBuild ? false : true,
		timestamps: true,
		online: true,
		minify: app.isDev ? true : false
	}

    // OS Panel on/off checking
	if (OSPanel == true) {
		browsersync_conf.proxy = {
			target: ProjectName,
		browsersync_conf.port = 3000

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
    app.plugins.browsersync.init(browsersync_conf)
}

/**
 * @callback functionCallback
 * @desc Callback function
 */