import { openMediaModal } from "./functions.js"

export class Media {
    constructor(type, path, title) {
        this.type = type;
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

    renderForLightbox() {
        const pictureElementLightbox = document.createElement("img");
        pictureElementLightbox.src = this.path;
        pictureElementLightbox.classList.add("media_zoom");
        pictureElementLightbox.setAttribute("alt", this.title)
        pictureElementLightbox.setAttribute("tabindex", 0)
        return pictureElementLightbox;
    }

    renderNameForLightbox() {
        const pictureElementName = document.createElement("span")
        pictureElementName.setAttribute("tabindex", 0)
        pictureElementName.innerText = this.title
        pictureElementName.classList.add("media_zoom_name")
        return pictureElementName;
    }

    render() {
        const pictureElement = document.createElement("img");
        pictureElement.src = this.path;
        pictureElement.setAttribute("tabindex", 0);
        pictureElement.classList.add("picture_gallery");
        pictureElement.setAttribute("alt", this.title)
        pictureElement.addEventListener("click", openMediaModal);
        pictureElement.addEventListener("keyup", function (event) {
            if (event.key === "Enter") {
                openMediaModal()
            }
        });

        return pictureElement;
    }


}

export class Video extends Media {
    constructor(path, title) {
        super('video', path, title);
    }

    renderForLightbox() {
        const videoElementLightbox = document.createElement("video");
        videoElementLightbox.setAttribute("tabindex", 0)
        videoElementLightbox.src = this.path;
        videoElementLightbox.controls = true;
        videoElementLightbox.classList.add("media_zoom");
        videoElementLightbox.setAttribute("alt", this.title)
        return videoElementLightbox;
    }

    renderNameForLightbox() {
        const videoElementName = document.createElement("span")
        videoElementName.setAttribute("tabindex", 0)
        videoElementName.innerText = this.title
        videoElementName.classList.add("media_zoom_name")
        return videoElementName;
    }

    render() {
        const videoElement = document.createElement("video");
        videoElement.src = this.path;
        videoElement.setAttribute("tabindex", 0);
        videoElement.controls = false;
        videoElement.classList.add("picture_gallery");
        videoElement.setAttribute("alt", this.title)
        videoElement.addEventListener("click", openMediaModal);
        videoElement.addEventListener("keyup", function (event) {
            if (event.key === "Enter") {
                openMediaModal()
            }
        });
        return videoElement;
    }


}

