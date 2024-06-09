import { openMediaModal } from "./functions.js"

export class Media {
    constructor(type, path, title) {
        this.type = type; // 'image' ou 'video'
        this.path = path;
        this.title = title;
    }

    render() {
        throw new Error("Method 'render' must be implemented.");
    }
}

export class Image extends Media {
    constructor(path, title) {
        super('image', path, title);
    }

    render() {
        const pictureElement = document.createElement("img");
        pictureElement.src = this.path;
        pictureElement.setAttribute("tabindex", 0);
        pictureElement.classList.add("picture_gallery");
        pictureElement.addEventListener("click", () => {
            openMediaModal(this.path, this.title);
        });
        return pictureElement;
    }
}

export class Video extends Media {
    constructor(path, title) {
        super('video', path, title);
    }

    render() {
        const videoElement = document.createElement("video");
        videoElement.src = this.path;
        videoElement.setAttribute("tabindex", 0);
        videoElement.controls = true; // Active les contrôles de lecture vidéo
        videoElement.classList.add("picture_gallery");
        videoElement.addEventListener("click", () => {
            openMediaModal(this.path, this.title);
        });
        return videoElement;
    }
}

