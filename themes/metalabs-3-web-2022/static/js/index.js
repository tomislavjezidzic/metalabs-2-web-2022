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
import Loader from "./components/Loader";
import NavigationController from "./components/NavigationController";
import Cursor from "./components/Cursor";
import Video from "./components/Video";
import ThreeDSlider from "./components/3dSlider";
import HeaderModel from "./components/HeaderModel";
import ContactModel from "./components/ContactModel";
import Marquee from "./components/Marquee";
import FlickeringText from "./components/FlickeringText";
import SmoothScroll from "./components/SmoothScroll";

import ScrollTo from "@bornfight/b-scroll-to";
import Flicker404 from "./components/Flicker404";

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

    const afterLoader = new Event("afterLoader");
    const midLoader = new Event("midLoader");

    /**
     * COMPONENTS INIT
     */

    /**
     * Loader
     * @type {Loader}
     */
    const loader = new Loader(afterLoader, midLoader);
    loader.init();

    /**
     * Loader
     * @type {Loader}
     */
    const video = new Video();
    video.init();

    /**
     * SmoothScroll
     * @type {SmoothScroll}
     */
    const smoothScroll = new SmoothScroll();
    smoothScroll.init();

    /**
     * Navigation
     * @type {NavigationController}
     */
    const navigation = new NavigationController();
    navigation.init();

    /**
     * ThreeDSlider
     * @type {ThreeDSlider}
     */
    const threeDSlider = new ThreeDSlider();
    threeDSlider.init();

    /**
     * HeaderModel
     * @type {HeaderModel}
     */
    const headerModel = new HeaderModel();
    headerModel.init();

    /**
     * ContactModel
     * @type {ContactModel}
     */
    const contactModel = new ContactModel();
    contactModel.init();

    const marquee = new Marquee();
    marquee.init();

    const flickeringText = new FlickeringText();
    flickeringText.init();

    const flicker404 = new Flicker404();
    flicker404.init();

    setTimeout(() => {
        /**
         * Cursor
         * @type {Cursor}
         */
        const cursor = new Cursor();
        cursor.init();

        new ScrollTo();
    }, 500);
});
