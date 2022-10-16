import gsap from "gsap";
import { SplitText } from "gsap/dist/SplitText";
import Swiper, { Navigation, Pagination } from "swiper";

gsap.registerPlugin(SplitText);

export default class ThreeDSlider {
    constructor() {
        this.DOM = {
            wrapper: ".js-3d-slider-wrapper",
            slider: ".js-3d-slider",
            next: ".js-3d-slider-next",
            prev: ".js-3d-slider-prev",
            pagination: ".js-3d-slider-pagination",
            primaryTitle: ".js-slide-title-primary",
            secondaryTitle: ".js-slide-title-secondary",
        };

        this.wrapper = document.querySelector(this.DOM.wrapper);
    }

    init() {
        if (!this.wrapper) return;

        const slider = this.wrapper.querySelector(this.DOM.slider);
        const next = this.wrapper.querySelector(this.DOM.next);
        const prev = this.wrapper.querySelector(this.DOM.prev);
        const pagination = this.wrapper.querySelector(this.DOM.pagination);

        const swiper = new Swiper(slider, {
            modules: [Navigation, Pagination],
            loop: false,
            pagination: {
                el: pagination,
                clickable: false,
                renderBullet: (index, className) => {
                    return `<span class="${className}"><span>0</span><span>1</span></span>`;
                },
            },
            navigation: {
                nextEl: next,
                prevEl: prev,
            },
            on: {
                slideChange: (swiper) => this.animateTitles(swiper),
                afterInit: (swiper) => setTimeout(() => this.animateTitles(swiper), 100),
            },
        });

        swiper.slides.forEach((slide) => {
            const titlePrimary = slide.querySelector(this.DOM.primaryTitle);
            const titleSecondary = slide.querySelector(this.DOM.secondaryTitle);

            const splitPrimary = new SplitText(titlePrimary, {
                type: "chars",
                charsClass: "split-text-char",
            });

            const splitSecondary = new SplitText(titleSecondary, {
                type: "chars",
                charsClass: "split-text-char",
            });

            gsap.set(splitPrimary.chars, {
                visibility: "hidden",
            });
        });
    }

    animateTitles(swiper) {
        this.animateTitleIn(swiper.slides[swiper.activeIndex]);

        if (swiper.slides[swiper.previousIndex]) {
            this.animateTitleOut(swiper.slides[swiper.previousIndex]);
        }
    }

    animateTitleIn(slide) {
        const titlePrimaryChars = slide.querySelector(this.DOM.primaryTitle).querySelectorAll(".split-text-char");
        const titleSecondaryChars = slide.querySelector(this.DOM.secondaryTitle).querySelectorAll(".split-text-char");

        gsap.to(titlePrimaryChars, {
            visibility: "visible",
            delay: 0.6,
            duration: 0.2,
            stagger: {
                each: 0.05,
                from: "center",
            },
        });

        gsap.to(titleSecondaryChars, {
            visibility: "hidden",
            delay: 0.4,
            duration: 0.2,
            stagger: {
                each: 0.05,
                from: "center",
            },
        });
    }

    animateTitleOut(slide) {
        const titlePrimaryChars = slide.querySelector(this.DOM.primaryTitle).querySelectorAll(".split-text-char");
        const titleSecondaryChars = slide.querySelector(this.DOM.secondaryTitle).querySelectorAll(".split-text-char");

        gsap.to(titlePrimaryChars, {
            visibility: "hidden",
        });

        gsap.to(titleSecondaryChars, {
            visibility: "visible",
        });
    }
}
