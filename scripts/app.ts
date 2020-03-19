/* globals lang */
require("i18n/i18n.js"); // Generates global lang object
import Application = require("sf-core/application");
import { errorStackBySourceMap } from "error-by-sourcemap";
import System = require("sf-core/device/system");
// Set uncaught exception handler, all exceptions that are not caught will
// trigger onUnhandledError callback.
Application.onUnhandledError = function (e: UnhandledError) {
    const error = errorStackBySourceMap(e);
    alert({
        title: e.type || lang.applicationError,
        message: System.OS === "Android" ? error.stack : (e.message + "\n\n*" + error.stack)
    });
};
import "./theme";
require("sf-extension-utils");
const router = require("./routes");
router.push("/pages/page1");
