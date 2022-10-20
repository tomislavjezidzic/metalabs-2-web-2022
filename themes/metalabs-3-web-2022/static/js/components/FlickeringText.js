import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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
        const texts = wrapper.querySelectorAll("b");

        if (texts.length < 1) return;

        texts.forEach((text) => {
            gsap.timeline({
                scrollTrigger: {
                    trigger: text,
                    start: "top 70%",
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
}
