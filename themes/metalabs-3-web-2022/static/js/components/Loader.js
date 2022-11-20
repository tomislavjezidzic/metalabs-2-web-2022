import gsap from "gsap";
import lottie from "lottie-web/build/player/lottie_light";
import ScrollLock from "@bornfight/b-scroll-lock";

export default class Loader {
    constructor(afterLoader, midLoader) {
        this.DOM = {
            wrapper: ".js-loader",
            animation: ".js-loader-animation",
            animationWrapper: ".js-loader-animation-wrapper",
            logo: ".js-nav-logo",
            header: ".js-header",
            nav: ".js-navigation-wrapper",
        };

        this.wrapper = document.querySelector(this.DOM.wrapper);
        this.afterLoader = afterLoader;
        this.midLoader = midLoader;

        if (!this.wrapper) {
            document.dispatchEvent(this.midLoader);
            document.dispatchEvent(this.afterLoader);
        }

        this.logo = document.querySelector(this.DOM.logo)?.getBoundingClientRect();
        this.header = document.querySelector(this.DOM.header);
        this.nav = document.querySelector(this.DOM.nav);

        this.topLogoOffset = this.logo?.top;
        this.leftLogoOffset = this.logo?.left;
        this.additionOffset = (10 / 1440) * window.innerWidth;

        gsap.set(this.header, {
            x: window.innerWidth * 0.1,
            y: window.innerWidth * 0.1,
            autoAlpha: 0,
        });

        gsap.set(this.nav, {
            autoAlpha: 0,
        });

        this.scrollLock = new ScrollLock();
    }

    init() {
        if (!this.wrapper) return;
        const animation = this.wrapper.querySelector(this.DOM.animation);
        const animationWrapper = this.wrapper.querySelector(this.DOM.animationWrapper);

        const json = animation.dataset.loader;

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
        let x = -(-this.leftLogoOffset - this.additionOffset + animationWrapper.offsetWidth / 2 - this.logo.width / 2);
        let y = -(this.topOffset - this.topLogoOffset + animationWrapper.offsetHeight / 2 - this.logo.height / 2);
        let scale = 0.69;
        let duration = 0.3;

        this.wrapper.classList.add("is-transparent");

        if (window.innerWidth < 800) {
            x = 0;
            y = 0;
            scale = 1;
            duration = 0;
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
            .add("nav", "start+=0.2")
            .to(
                this.wrapper,
                {
                    autoAlpha: 0,
                },
                "nav",
            )
            .to(
                this.nav,
                {
                    autoAlpha: 1,
                },
                "nav",
            )
            .add("content", "-=0.1")
            .to(
                this.header,
                {
                    y: 0,
                    autoAlpha: 0.5,
                    duration: 0.6,
                    ease: "power3.in",
                },
                "content",
            )
            .to(this.header, {
                x: 0,
                autoAlpha: 1,
                duration: 0.6,
                ease: "power3.out",
                onStart: () => document.dispatchEvent(this.afterLoader),
            });
    }
}
