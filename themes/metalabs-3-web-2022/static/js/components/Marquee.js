import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
/**
 * Marquee Controller
 */
export default class Marquee {
    constructor() {
        this.DOM = {
            item: ".js-scroll-marquee",
        };

        this.items = document.querySelectorAll(this.DOM.item);
    }

    init() {
        console.log("MarqueeController init()");
        if (this.items.length < 1) {
            return;
        }

        this.items.forEach((item, index) => {
            this.animateLine(item, index % 2 === 0);
        });
    }

    /**
     *
     * @param line
     * @param direction
     */
    animateLine(line, direction) {
        let start = -100;
        let end = 0;

        if (direction) {
            start = 0;
            end = -100;
        }

        const mover = line.querySelectorAll(".c-marque-module__mover");

        gsap.fromTo(
            mover,
            {
                xPercent: start,
            },
            {
                xPercent: end,
                scrollTrigger: {
                    trigger: line,
                    start: "top bottom",
                    end: "bottom top",
                },
                repeat: -1,
                duration: 16,
                ease: "none",
            },
        );
    }
}
