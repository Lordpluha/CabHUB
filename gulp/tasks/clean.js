import { deleteAsync } from "del";

/**
 * @file Clean module
 * @module tasks/clean
 * @version 1.0.0
 * @requires del~deleteAsync
 * @exports cleanBuild
 */

/**`
 * @async
 * @function cleanBuild
 * @desc Clean [./dist]{@link module:configs/path.path.build}
 */
export const cleanBuild = () => {
    /**
     * @event cleanBuild
     * @desc Event of clean [./dist]{@link module:configs/path.path.build}
     * @see [cleanBuild]{@link module:tasks/clean~cleanBuild}
     */
    return deleteAsync(app.path.buildFolder);
}