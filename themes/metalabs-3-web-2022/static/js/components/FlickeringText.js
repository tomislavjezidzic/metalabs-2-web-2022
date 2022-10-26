import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { SplitText } from "gsap/dist/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default class FlickeringText {
    constructor() {
        this.DOM = {
            wrapper: ".js-flickering-text",
        };

        this.wrappers = document.querySelectorAll(this.DOM.wrapper);
    }

    init() {
        if (this.wrappers.length < 1) return;

        this.wrappers.forEach((wrapper) => this.singleWrapper(wrapper));
    }

    singleWrapper(wrapper) {
        const split = new SplitText(wrapper, {
            type: "words",
            wordsClass: "u-split-text-word",
        });

        this.animateIn(split.words, wrapper);

        const texts = wrapper.querySelectorAll("b");

        if (texts.length < 1) return;

        texts.forEach((text) => {
            gsap.timeline({
                delay: 1,
                scrollTrigger: {
                    trigger: text,
                    start: "top 90%",
                },
            })
                .to(text, {
                    classList: "is-serif",
                    duration: 0.05,
                })
                .to(text, {
                    classList: "",
                    duration: 0.05,
                })
                .to(text, {
                    classList: "is-serif",
                    duration: 0.075,
                })
                .to(text, {
                    classList: "",
                    duration: 0.075,
                })
                .to(text, {
                    classList: "is-serif",
                    duration: 0.1,
                });
        });
    }

    animateIn(words, wrapper) {
        gsap.set(words, {
            autoAlpha: 0,
        });

        gsap.fromTo(
            words,
            {
                y: "20%",
                autoAlpha: 0,
            },
            {
                y: "0%",
                autoAlpha: 1,
                ease: "power4.out",
                stagger: 0.05,
                scrollTrigger: {
                    trigger: wrapper,
                    start: "top 90%",
                    end: "bottom top",
                },
            },
        );
    }
}
