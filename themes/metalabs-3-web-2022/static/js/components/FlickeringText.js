import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { SplitText } from "gsap/dist/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default class FlickeringText {
    constructor() {
        this.DOM = {
            wrapper: ".js-flickering-text",
            email: ".js-mail-reveal a",
        };

        this.wrappers = document.querySelectorAll(this.DOM.wrapper);
        this.email = document.querySelector(this.DOM.email);
    }

    init() {
        if (this.email) this.emailReveal();

        if (this.wrappers.length < 1) return;

        this.wrappers.forEach((wrapper) => this.singleWrapper(wrapper));
    }

    singleWrapper(wrapper) {
        const split = new SplitText(wrapper, {
            type: "words",
            wordsClass: "u-split-text-word",
        });

        document.addEventListener("afterLoader", () => {
            this.animateIn(split.words, wrapper);

            const texts = wrapper.querySelectorAll("b");

            if (texts.length < 1) return;

            texts.forEach((text) => {
                gsap.timeline({
                    delay: 0.6,
                    scrollTrigger: {
                        trigger: text,
                        start: "top 90%",
                        end: "bottom 10%",
                        toggleActions: "restart none restart none",
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
                ease: "expo.inOut",
                stagger: 0.02,
                duration: 0.4,
                scrollTrigger: {
                    trigger: wrapper,
                    start: "top 85%",
                    end: "bottom top",
                },
            },
        );
    }

    emailReveal() {
        const split = new SplitText(this.email, {
            type: "chars",
            wordsClass: "u-split-text-word",
        });

        console.log(split.chars);

        gsap.set(split.chars, {
            autoAlpha: 0,
        });

        gsap.fromTo(
            split.chars,
            {
                y: "20%",
                autoAlpha: 0,
            },
            {
                y: "0%",
                autoAlpha: 1,
                ease: "expo.inOut",
                stagger: 0.02,
                duration: 0.4,
                scrollTrigger: {
                    trigger: this.email,
                    start: "top 80%",
                    end: "bottom top",
                },
            },
        );
    }
}
