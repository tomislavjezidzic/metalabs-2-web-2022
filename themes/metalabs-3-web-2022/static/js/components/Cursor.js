import gsap from "gsap";
import is from "is_js";

export default class Cursor {
    constructor() {
        this.DOM = {
            wrapper: ".js-cursor",
        };

        this.wrapper = document.querySelector(this.DOM.wrapper);
        this.body = document.querySelector("body");
        this.moved = false;
    }

    init() {
        if (!this.wrapper || is.touchDevice()) return;

        const offsetY = this.wrapper.offsetHeight * 0.5;
        const offsetX = this.wrapper.offsetWidth * 0.05;

        window.addEventListener("pointermove", (ev) => {
            if (!this.moved) {
                this.moved = true;
                this.wrapper.classList.add("is-moved");
            }
            
            gsap.set(this.wrapper, {
                x: ev.clientX - offsetX,
                y: ev.clientY - offsetY,
            });
        });

        this.body.addEventListener("mouseenter", () => {
            this.wrapper.classList.add("is-moved");
        });
        this.body.addEventListener("mouseleave", () => {
            this.wrapper.classList.remove("is-moved");
        });

        document.querySelectorAll("a").forEach((link) => {
            this.singleLink(link);
        });

        document.querySelectorAll(".has-hover").forEach((link) => {
            this.singleLink(link);
        });
    }

    singleLink(link) {
        link.addEventListener("mouseenter", () => {
            this.wrapper.classList.add("is-active");
        });

        link.addEventListener("mouseleave", () => {
            this.wrapper.classList.remove("is-active");
        });
    }
}
