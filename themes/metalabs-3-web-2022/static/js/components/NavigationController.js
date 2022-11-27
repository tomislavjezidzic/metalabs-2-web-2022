import { gsap } from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Navigation controller
 * "smart" navigation which goes off screen when scrolling down for a better overview of content and UX
 * navigation appears when scrolling up
 */
export default class NavigationController {
    constructor() {
        /**
         * Navigation DOM selectors
         * Navigation DOM state CSS classes
         * @type {{navigation: string, states: {navigationSlideUp: string, navigationScrolled: string, navigationFixed: string, active: string, mobileOpened: string}}}
         */
        this.DOM = {
            navigation: ".js-navigation",
            navigationItem: ".js-navigation-item",
            hamburger: ".js-hamburger",
            navigationList: ".js-navigation-list",
            states: {
                navigationScrolled: "has-scrolled",
                navigationFixed: "is-fixed",
                navigationSlideUp: "slide-up",
                active: "is-active",
                mobileOpened: "is-mobile-opened",
            },
        };

        /**
         * flag, state variable for scrolling event
         * @type {boolean}
         */
        this.scrolling = false;
        /**
         * amount of pixels to scroll from top for adding "has-scrolled" state class
         * @type {number}
         */
        this.scrollNavigationOffset = 200;
        /**
         * variable for storing amount of scroll from top position value
         * @type {number}
         */
        this.previousTop = 0;
        /**
         * variable for storing current scroll position value
         * @type {number}
         */
        this.currentTop = 0;
        this.scrollDelta = 0;
        this.scrollOffset = 0;

        /**
         * fetch navigation element DOM element
         * @type {Element}
         */
        this.navigation = document.querySelector(this.DOM.navigation);
        this.hamburger = document.querySelector(this.DOM.hamburger);
        this.navigationList = document.querySelector(this.DOM.navigationList);
        this.bodyItems = document.querySelectorAll("[data-anchor-target]");
    }

    //region methods

    /**
     *
     */
    init() {
        if (this.navigation !== null) {
            console.log("Navigation init()");
            this.navigationController();
        }

        if (this.navigationList !== null && this.hamburger !== null) this.mobileNavigation();

        if (this.navigationList && this.bodyItems.length > 0) this.activeController();
    }

    activeController() {
        this.bodyItems.forEach((item) => {
            const target = item.dataset.anchorTarget;

            if (target) {
                const link = document.querySelector(`[data-scroll-to="#${target}"]`);

                if (link) {
                    ScrollTrigger.create({
                        trigger: item,
                        start: "top center",
                        end: "bottom center",
                        onEnter: () => {
                            link.classList.add("is-active");
                        },
                        onEnterBack: () => {
                            link.classList.add("is-active");
                        },
                        onLeave: () => {
                            link.classList.remove("is-active");
                        },
                        onLeaveBack: () => {
                            link.classList.remove("is-active");
                        },
                    });
                }
            }
        });
    }

    /**
     *
     */
    navigationController() {
        document.addEventListener("scroll", () => {
            if (!this.scrolling) {
                this.scrolling = true;

                if (!window.requestAnimationFrame) {
                    setTimeout(this.checkScroll(), 250);
                } else {
                    requestAnimationFrame(() => this.checkScroll());
                }
            }
        });
    }

    /**
     *
     */
    checkScroll() {
        /**
         *
         * @type {number}
         */
        let currentTop = window.pageYOffset | document.body.scrollTop;

        this.changeNavigationState(currentTop);

        this.previousTop = currentTop;
        this.scrolling = false;
    }

    /**
     *
     * @param currentTop
     */
    changeNavigationState(currentTop) {
        if (currentTop > this.scrollNavigationOffset) {
            this.navigation.classList.add(this.DOM.states.navigationScrolled);
        } else {
            this.navigation.classList.remove(this.DOM.states.navigationScrolled);
        }

        if (this.previousTop >= currentTop) {
            this.scrollingUp(currentTop);
        } else {
            this.scrollingDown(currentTop);
        }
    }

    /**
     *
     * @param currentTop
     */
    scrollingUp(currentTop) {
        if (currentTop < this.scrollNavigationOffset) {
            this.navigation.classList.remove(this.DOM.states.navigationSlideUp);
        } else if (this.previousTop - currentTop > this.scrollDelta) {
            this.navigation.classList.remove(this.DOM.states.navigationSlideUp);
        }
    }

    /**
     *
     * @param currentTop
     */
    scrollingDown(currentTop) {
        if (currentTop > this.scrollNavigationOffset + this.scrollOffset) {
            this.navigation.classList.add(this.DOM.states.navigationSlideUp);
        } else if (currentTop > this.scrollNavigationOffset) {
            this.navigation.classList.remove(this.DOM.states.navigationSlideUp);
        }
    }

    //endregion
    mobileNavigation() {
        this.navigationActive = false;
        this.navigationItems = document.querySelectorAll(this.DOM.navigationItem);
        this.hamburger.addEventListener("click", () => {
            if (!this.navigationActive) {
                this.openNavigation();
            } else {
                this.closeNavigation();
            }
        });

        if (this.navigationItems.length > 0) {
            this.navigationItems.forEach((item) => {
                item.addEventListener("click", () => {
                    this.closeNavigation();
                });
            });
        }
    }

    openNavigation() {
        this.navigation.classList.add(this.DOM.states.mobileOpened);
        this.navigationActive = true;
        this.hamburger.classList.add(this.DOM.states.active);
        this.navigationList.classList.add(this.DOM.states.active);

        gsap.fromTo(
            this.navigationItems,
            {
                autoAlpha: 0,
            },
            {
                autoAlpha: 1,
                duration: 0.5,
                stagger: 0.1,
            },
        );
    }

    closeNavigation() {
        this.navigation.classList.remove(this.DOM.states.mobileOpened);
        this.navigationActive = false;
        this.hamburger.classList.remove(this.DOM.states.active);
        this.navigationList.classList.remove(this.DOM.states.active);
    }
}
