import gsap from "gsap";
import { SplitText } from "gsap/dist/SplitText";
import lottie from "lottie-web/build/player/lottie_light";
import is from "is_js";

gsap.registerPlugin(SplitText);

export default class Loader {
    constructor(afterLoader, midLoader, scrollLock) {
        this.DOM = {
            wrapper: ".js-loader",
            animation: ".js-loader-animation",
            animationWrapper: ".js-loader-animation-wrapper",
            logo: ".js-nav-logo",
            header: ".js-header",
            headerSubtitle: ".js-header-subtitle",
            headerArrow: ".js-header-arrow",
            nav: ".js-navigation-wrapper",
        };

        this.wrapper = document.querySelector(this.DOM.wrapper);
        this.afterLoader = afterLoader;
        this.midLoader = midLoader;

        if (!this.wrapper) {
            document.dispatchEvent(this.midLoader);
            document.dispatchEvent(this.afterLoader);
        }

        this.subtitle = document.querySelector(this.DOM.headerSubtitle);
        this.arrow = document.querySelector(this.DOM.headerArrow);
        this.logo = document.querySelector(this.DOM.logo);
        this.logoBox = this.logo?.getBoundingClientRect();
        this.header = document.querySelector(this.DOM.header);
        this.nav = document.querySelector(this.DOM.nav);

        this.topLogoOffset = this.logoBox?.top;
        this.leftLogoOffset = this.logoBox?.left;
        this.additionOffset = (10 / 1440) * window.innerWidth;
        this.headerOffset = window.innerWidth * 0.1;

        if (this.header) {
            gsap.set(this.header, {
                x: this.headerOffset,
                y: this.headerOffset,
                autoAlpha: 0,
            });
        }

        if (this.nav) {
            gsap.set(this.nav, {
                autoAlpha: 0,
            });
        }

        this.scrollLock = scrollLock;
    }

    init() {
        if (!this.wrapper) return;
        const animation = this.wrapper.querySelector(this.DOM.animation);
        const animationWrapper = this.wrapper.querySelector(this.DOM.animationWrapper);

        let json = animation.dataset.loader;

        if ((is.mobile() || window.innerWidth < 800) && animation.dataset.loaderMobile) {
            json = animation.dataset.loaderMobile;
        }

        if (!json) return;

        const lottieAnim = lottie.loadAnimation({
            container: animation,
            renderer: "svg",
            autoplay: false,
            path: json,
        });

        setTimeout(() => {
            if (window.smoother !== undefined) {
                window.smoother.paused(true);
            } else {
                this.scrollLock.lockScroll();
            }
            lottieAnim.play();
        }, 200);

        lottieAnim.addEventListener("enterFrame", (animation) => {
            if (animation.currentTime > lottieAnim.totalFrames - 1) {
                lottieAnim.pause();
                this.endOfAnimation(animationWrapper);
            }
        });
    }

    endOfAnimation(animationWrapper) {
        if (window.smoother !== undefined) {
            window.smoother.paused(false);
        } else {
            this.scrollLock.unlockScroll();
        }

        this.topOffset = animationWrapper.getBoundingClientRect().top;
        let x = -(-this.leftLogoOffset - this.additionOffset + animationWrapper.offsetWidth / 2 - this.logoBox.width / 2);
        let y = -(this.topOffset - this.topLogoOffset + animationWrapper.offsetHeight / 2 - this.logoBox.height / 2);
        let scale = 0.69;
        let duration = 0.3;
        let subtitleWords = null;

        this.wrapper.classList.add("is-transparent");

        if (window.innerWidth < 800) {
            x = 0;
            y = 0;
            scale = 1;
            duration = 0;
        }

        gsap.set([this.logo, this.arrow], {
            autoAlpha: 0,
        });

        if (this.subtitle) {
            const split = new SplitText(this.subtitle, {
                type: "words",
                wordsClass: "u-split-text-word",
            });

            gsap.to(split.words, {
                autoAlpha: 0,
            });

            subtitleWords = split.words;
        }

        gsap.timeline({
            onStart: () => document.dispatchEvent(this.midLoader),
        })
            .add("start")
            .to(
                animationWrapper,
                {
                    x: x,
                    y: y,
                    scale: scale,
                    duration: duration,
                },
                "start",
            )
            .add("nav", "start+=0.1")
            .to(
                this.wrapper,
                {
                    autoAlpha: 0,
                    onStart: () => {
                        gsap.to(this.logo, {
                            autoAlpha: 1,
                        });
                    },
                },
                "nav+=0.3",
            )
            .fromTo(
                this.nav,
                {
                    autoAlpha: 0,
                    x: this.headerOffset,
                    y: this.headerOffset,
                },
                {
                    autoAlpha: 1,
                    x: 0,
                    y: 0,
                    ease: "power4.out",
                },
                "nav",
            )
            .to(
                this.header,
                {
                    y: 0,
                    x: 0,
                    autoAlpha: 1,
                    duration: 0.7,
                    ease: "power3.out",
                    onStart: () => {
                        document.dispatchEvent(this.afterLoader);

                        gsap.fromTo(
                            subtitleWords,
                            {
                                y: "1em",
                                autoAlpha: 0,
                            },
                            {
                                y: "0em",
                                autoAlpha: 1,
                                stagger: 0.05,
                                ease: "power4.out",
                            },
                        );
                    },
                },
                "nav+=0.1",
            )
            .fromTo(
                this.arrow,
                {
                    y: "-30%",
                    autoAlpha: 0,
                },
                {
                    y: "0%",
                    autoAlpha: 1,
                    ease: "power4.out",
                    duration: 0.8,
                },
                "nav+=0.6",
            );
    }
}
