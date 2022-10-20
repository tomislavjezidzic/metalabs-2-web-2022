import gsap from "gsap";
import { SplitText } from "gsap/dist/SplitText";
import Swiper, { Navigation, Pagination } from "swiper";
import ThreeDSliderModels from "./3dSliderModels";

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
        this.models = new ThreeDSliderModels(this.wrapper);

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
                    return `
                        <span class="${className}">
                            <span>
                                <svg class="u-icon" viewBox="0 0 12 19" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6.18029 18.7476C9.98524 18.7476 11.5688 15.6579 11.5688 10.0807V8.66682C11.5688 3.08968 9.98524 0 6.18029 0H5.38851C1.60556 0 0 3.0635 0 8.66682V10.0807C0 15.6841 1.60556 18.7476 5.38851 18.7476H6.18029ZM5.47649 16.3387C3.34308 16.3387 2.30936 14.4272 2.30936 10.6044V8.14315C2.30936 4.32032 3.34308 2.4089 5.47649 2.4089H6.11431C8.24772 2.4089 9.28143 4.32032 9.28143 8.14315V10.6044C9.28143 14.4272 8.24772 16.3387 6.11431 16.3387H5.47649Z"/>
                                </svg>
                            </span>
                            <span>
                                <svg class="u-icon" viewBox="0 0 8 19" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.6973 1.57724L0.851562 0H7.27867L5.43294 1.57724V16.7863L7.27867 18.3635H0.851562L2.6973 16.7863V1.57724Z"/>
                                </svg>
                            </span>
                        </span>`;
                },
            },
            navigation: {
                nextEl: next,
                prevEl: prev,
            },
            on: {
                slideChange: (swiper) => {
                    this.animateTitles(swiper);

                    this.models.changeSlide(swiper.activeIndex, swiper.previousIndex);
                },
                afterInit: (swiper) => {
                    this.models.init();

                    swiper.slides.forEach((slide, index) => this.models.initModel(slide, index));

                    this.onScrollAnimation(swiper.slides[0], swiper);
                },
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

    onScrollAnimation(firstSlide, swiper) {
        if (!firstSlide) return;

        gsap.fromTo(
            firstSlide,
            {
                x: "100%",
                autoAlpha: 0,
            },
            {
                x: "0%",
                autoAlpha: 1,
                ease: "power4.out",
                duration: 1.2,
                scrollTrigger: {
                    trigger: this.wrapper,
                    start: "top 40%",
                    end: "bottom bottom",
                },
                onStart: () => this.animateTitles(swiper),
            },
        );
    }
}
