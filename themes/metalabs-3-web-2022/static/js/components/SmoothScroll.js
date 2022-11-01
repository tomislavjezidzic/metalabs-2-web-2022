import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { ScrollSmoother } from "gsap/dist/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default class SmoothScroll {
    constructor() {
        this.DOM = {

        };
    }

    init() {
        const wrapper = document.querySelector("#smoothscroll-wrapper");
        const content = document.querySelector("#smoothscroll-content");

        if (!wrapper || !content) return;

        ScrollTrigger.matchMedia({
            "(min-width: 901px)": () => {
                window.smoother = ScrollSmoother.create({
                    wrapper: wrapper,
                    content: content,
                    smooth: 1,
                    effects: true,
                    normalizeScroll: true,
                });
            },
        });
    }
}
