import gsap from "gsap";
import Swiper, { Navigation, Pagination } from "swiper";

export default class ThreeDSlider {
    constructor() {
        this.DOM = {
            wrapper: ".js-3d-slider-wrapper",
            slider: ".js-3d-slider",
            next: ".js-3d-slider-next",
            prev: ".js-3d-slider-prev",
            pagination: ".js-3d-slider-pagination",
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
            },
            navigation: {
                nextEl: next,
                prevEl: prev,
            },
        });
    }
}
