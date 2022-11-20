import is from "is_js";

export default class Video {
    constructor() {
        this.DOM = {
            video: ".js-video",
        };

        this.videos = document.querySelectorAll(this.DOM.video);
    }

    init() {
        if (this.videos.length < 1) return;

        this.videos.forEach((video) => this.singleVideo(video));
    }

    singleVideo(video) {
        const mobileUrl = video.dataset.mobile;

        if (is.mobile() || window.innerWidth < 800) {
            video.src = mobileUrl;
        }
    }
}
