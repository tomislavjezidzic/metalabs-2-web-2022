import gsap from "gsap";
import lottie from "lottie-web/build/player/lottie_light";

export default class Loader {
    constructor() {
        this.DOM = {
            wrapper: ".js-loader",
            animation: ".js-loader-animation",
            animationWrapper: ".js-loader-animation-wrapper",
            logo: ".js-nav-logo",
        };

        this.wrapper = document.querySelector(this.DOM.wrapper);
        this.logo = document.querySelector(this.DOM.logo).getBoundingClientRect();
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
            autoplay: true,
            path: json,
        });

        lottieAnim.addEventListener("enterFrame", (animation) => {
            if (animation.currentTime > lottieAnim.totalFrames - 1) {
                lottieAnim.pause();
                this.endOfAnimation(animationWrapper);
            }
        });
    }

    endOfAnimation(animationWrapper) {
        const topOffset = animationWrapper.getBoundingClientRect().top;
        const topLogoOffset = this.logo.top;
        const leftLogoOffset = this.logo.left;
        const additionOffset = (10 / 1440) * window.innerWidth;
        let x = -(-leftLogoOffset - additionOffset + animationWrapper.offsetWidth / 2 - this.logo.width / 2);
        let y = -(topOffset - topLogoOffset + animationWrapper.offsetHeight / 2 - this.logo.height / 2);
        let scale = 0.7;
        let duration = 1;

        if (window.innerWidth < 800) {
            x = 0;
            y = 0;
            scale = 1;
            duration = 0;
        }

        gsap.timeline()
            .to(animationWrapper, {
                x: x,
                y: y,
                scale: scale,
                duration: duration,
                ease: "power3.inOut",
            })
            .to(this.wrapper, {
                autoAlpha: 0,
            });
    }
}
