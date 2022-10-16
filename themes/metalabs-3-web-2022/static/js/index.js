/**
 * MAIN JS FILE
 */

/**
 * Helpers
 * Imports of helper functions are stripped out of bundle
 * Include them within "start-strip-code" and "end-strip-code" comments
 */
/* start-strip-code */
import GridHelper from "./helpers/GridHelper";
/* end-strip-code */
/**
 * Components
 */
import NavigationController from "./components/NavigationController";
import Cursor from "./components/Cursor";
import ThreeDSlider from "./components/3dSlider";

/**
 * Check if document is ready cross-browser
 * @param callback
 */
const ready = (callback) => {
    if (document.readyState !== "loading") {
        /**
         * Document is already ready, call the callback directly
         */
        callback();
    } else if (document.addEventListener) {
        /**
         * All modern browsers to register DOMContentLoaded
         */
        document.addEventListener("DOMContentLoaded", callback);
    } else {
        /**
         * Old IE browsers
         */
        document.attachEvent("onreadystatechange", function () {
            if (document.readyState === "complete") {
                callback();
            }
        });
    }
};

/**
 * Document ready callback
 */
ready(() => {
    /**
     * HELPERS INIT
     * Only init helpers if they exist
     * Will be undefined on production because of import stripping
     */
    if (typeof GridHelper == "function") {
        const grid = new GridHelper();
        grid.init();
    }

    const doc = document.documentElement;
    doc.style.setProperty("--win-height", `${window.innerHeight}px`);

    /**
     * COMPONENTS INIT
     */

    /**
     * Navigation
     * @type {NavigationController}
     */
    const navigation = new NavigationController();
    navigation.init();

    /**
     * Cursor
     * @type {Cursor}
     */
    const cursor = new Cursor();
    cursor.init();

    /**
     * ThreeDSlider
     * @type {ThreeDSlider}
     */
    const threeDSlider = new ThreeDSlider();
    threeDSlider.init();
});
