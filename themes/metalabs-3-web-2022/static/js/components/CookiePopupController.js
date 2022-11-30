import Cookies from "js-cookie";

/**
 * Cookie popup controller
 */
export default class CookiePopupController {
    constructor() {
        /**
         * DOM Elements
         * @type {{cookiePopup: string, cookieName: string, cookiePopupClose: string, states: {hasNoCookie: string}}}
         */
        this.DOM = {
            cookiePopup: ".js-cookie-message",
            cookiePopupClose: ".js-cookie-message-close",
            cookieName: "metalabs-3-cookie-acceptance",
            states: {
                hasNoCookie: "has-no-cookie",
            },
        };

        /**
         * fetch cookie popup DOM element
         * @type {Element}
         */
        this.cookiePopup = document.querySelector(this.DOM.cookiePopup);
    }

    /**
     * Init
     */
    init() {
        if (Cookies.get(this.DOM.cookieName) === "true") {
            return;
        }
        if (this.cookiePopup === null) {
            return;
        }
        this.startEvents();
    }

    /**
     * Start cookie popup events
     */
    startEvents() {
        this.cookiePopup.classList.add(this.DOM.states.hasNoCookie);
        const closeButton = this.cookiePopup.querySelector(this.DOM.cookiePopupClose);
        if (closeButton !== null) {
            closeButton.addEventListener("click", (event) => {
                event.preventDefault();
                this.closePopup();
                this.setCookie();
            });
        }
    }

    /**
     * Close popup
     */
    closePopup() {
        this.cookiePopup.classList.remove(this.DOM.states.hasNoCookie);
    }

    /**
     * Set cookie
     */
    setCookie() {
        const expireTime = new Date(new Date().getTime() + 525600 * 60 * 1000);
        Cookies.set(this.DOM.cookieName, "true", {
            expires: expireTime,
        });
    }
}
