import gsap from "gsap";
import {TextPlugin} from "gsap/dist/TextPlugin";

gsap.registerPlugin(TextPlugin);

export default class Flicker404 {
    constructor() {
        this.DOM = {
            text: ".js-404-flickering",
            states: {
                isActive: "is-active",
            },
        };

        this.text = document.querySelector(this.DOM.text);
    }

    /**
     * Init
     */
    init() {
        if (this.text !== null) {
            this.setup();
        }
    }

    setup() {
        this.text.addEventListener("mouseenter", () => {
            this.onEnter();
        });
        this.text.addEventListener("mouseleave", () => {
            this.onExit();
        });
    }

    onExit() {
        gsap.to(this.text, {
            delay: 0.2,
            text: this.text.dataset.exit,
            duration: 0.5,
        });
        gsap.timeline({
            delay: 0,
            scrollTrigger: {
                trigger: this.text,
                start: "top 90%",
            },
        })
            .to(this.text, {
                classList: "is-serif",
                duration: 0.05,
            })
            .to(this.text, {
                classList: "",
                duration: 0.05,
            })
            .to(this.text, {
                classList: "is-serif",
                duration: 0.075,
            })
            .to(this.text, {
                classList: "",
                duration: 0.075,
            })
            .to(this.text, {
                classList: "is-serif",
                duration: 0.1,
            });
    }

    onEnter() {
        gsap.to(this.text, {
            delay: 0.2,
            text: this.text.dataset.enter,
            duration: 0.5,
        });
        gsap.timeline({
            delay: 0,
            scrollTrigger: {
                trigger: this.text,
                start: "top 90%",
            },
        })
            .to(this.text, {
                classList: "is-serif",
                duration: 0.05,
            })
            .to(this.text, {
                classList: "",
                duration: 0.05,
            })
            .to(this.text, {
                classList: "is-serif",
                duration: 0.075,
            })
            .to(this.text, {
                classList: "",
                duration: 0.075,
            })
            .to(this.text, {
                classList: "is-serif",
                duration: 0.1,
            })
            .to(this.text, {
                classList: "",
                duration: 0.075,
            });
    }
}
