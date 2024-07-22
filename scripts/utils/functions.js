import { Image, Video, } from "../utils/mediaitemsmanagement.js";


export async function getPhotographers() {
    const response = await fetch("./data/photographers.json");
    const photographersAndMedia = await response.json();
    return photographersAndMedia;
}

export function photographerTemplate(data) {
    const { name, id, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const link = document.createElement('a')
        link.href = `./photographer.html?id=${id}`
        link.setAttribute("tabindex", 0)

        const article = document.createElement('article');
        const img = document.createElement('img');
        img.setAttribute("src", picture)
        img.setAttribute("alt", "")
        const h2 = document.createElement('h2');
        h2.textContent = name;
        h2.setAttribute("alt", name)

        const infos = document.createElement('div')
        infos.classList.add("infos")
        infos.setAttribute("tabindex", 0)

        const localisation = document.createElement('span')
        localisation.textContent = `${city}, ${country}`
        localisation.classList.add('localisation')

        const taglineSpan = document.createElement('span')
        taglineSpan.textContent = tagline

        const priceSpan = document.createElement('span')
        priceSpan.textContent = `${price}€/jour`
        priceSpan.classList.add("price")

        link.insertAdjacentElement('afterbegin', img)
        link.appendChild(h2);
        article.appendChild(link)

        infos.appendChild(localisation)
        infos.appendChild(taglineSpan)
        infos.appendChild(priceSpan)

        article.appendChild(infos);

        return (article);
    }
    return { name, picture, getUserCardDOM }
}

export function isCurrentUrlMatch(url, id) {
    return url.endsWith(id);
}

export function displayPhotographerInfo(photographer) {
    const photographHeader = document.querySelector('.photograph-header');
    const picturePath = `assets/photographers/${photographer.portrait}`;
    const photographInfos = createElementWithClass("div", "photograph_infos");

    const photographName = createElementWithClass("h1", "photographer_name", photographer.name)
    photographName.setAttribute("tabindex", 0)

    photographInfos.appendChild(photographName);

    const infos = document.createElement('div')
    infos.classList.add("infos")
    infos.setAttribute("tabindex", 0)


    infos.appendChild(createElementWithClass("p", "photographer_localisation", `${photographer.city}, ${photographer.country}`));
    infos.appendChild(createElementWithClass("p", "photographer_tagline", photographer.tagline));

    photographInfos.appendChild(infos)

    photographHeader.insertAdjacentElement('afterbegin', photographInfos);

    const portrait = createImageElement(picturePath, "profil_picture");
    portrait.setAttribute("alt", photographer.name)
    portrait.setAttribute("tabindex", 0)

    photographHeader.appendChild(portrait);

    let pricePerDay = document.querySelector('.daily_rate')
    pricePerDay.textContent = `${photographer.price}€ / jour`


}

export function checkIfExistingAndRemove(element) {
    const existingElement = document.querySelector(element);
    if (existingElement) {
        existingElement.remove();
        return true
    }
}


export function displayMediaItem(mediaItem, photographersAndMedia) {
    const photographGallery = document.querySelector('.photographer_gallery');
    const cardPicture = createElementWithClass("article", "card_picture");
    const associatedPhotographer = photographersAndMedia.photographers.find(photographer => photographer.id === mediaItem.photographerId);
    const picturePath = `Sample Photos/${getFolderName(associatedPhotographer.name)}/${mediaItem.image}`;
    const videoPath = `Sample Photos/${getFolderName(associatedPhotographer.name)}/${mediaItem.video}`;

    let mediaElement;

    if (mediaItem.video && mediaItem.video.endsWith('.mp4')) {
        mediaElement = new Video(videoPath, mediaItem.title);

    } else if (mediaItem.image && mediaItem.image.endsWith('.jpg')) {
        mediaElement = new Image(picturePath, mediaItem.title);

    }

    if (mediaElement) {
        const mediaElementHtml = mediaElement.render();
        mediaElementHtml.setAttribute("data-date", mediaItem.date)
        cardPicture.appendChild(mediaElementHtml);

        mediaElementHtml.addEventListener("click", function () {
            checkIfExistingAndRemove(".media_zoom")
            checkIfExistingAndRemove(".media_zoom_name")

            const lightbox = document.querySelector('.lightbox')
            const mediaZoom = mediaElement.renderForLightbox();
            const mediaZoomName = mediaElement.renderNameForLightbox()
            lightbox.prepend(mediaZoomName)
            lightbox.prepend(mediaZoom)
        })

        mediaElementHtml.addEventListener("keyup", function (event) {
            if (event.key === "Enter") {
                checkIfExistingAndRemove(".media_zoom")
                checkIfExistingAndRemove(".media_zoom_name")

                const lightbox = document.querySelector('.lightbox')
                const mediaZoom = mediaElement.renderForLightbox();
                const mediaZoomName = mediaElement.renderNameForLightbox()
                lightbox.prepend(mediaZoomName)
                lightbox.prepend(mediaZoom)
            }

        })
    }

    const description = createElementWithClass("div", "picture_title_and_likes");
    const pictureTitle = createElementWithClass("span", "picture_title", mediaItem.title);
    pictureTitle.setAttribute("tabindex", 0)
    const likes = createElementWithClass("div", "likes");
    likes.setAttribute("tabindex", 0)
    likes.setAttribute("aria-label", "likes")


    let nbrOfLikes = createElementWithClass("span", "nbrOfLikes", mediaItem.likes);

    const likesLogo = createImageElement("./assets/icons/like.png", "likes_logo");
    likesLogo.setAttribute("alt", "likes")
    likesLogo.addEventListener('click', () => {
        nbrOfLikes.textContent = parseInt(nbrOfLikes.textContent) + 1;
        updateTotalNbrOfLikes()
    })

    likes.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            nbrOfLikes.textContent = parseInt(nbrOfLikes.textContent) + 1;
            updateTotalNbrOfLikes()
        }
    })

    likes.appendChild(nbrOfLikes);
    likes.appendChild(likesLogo);
    cardPicture.appendChild(description);
    description.appendChild(pictureTitle);
    description.appendChild(likes);
    photographGallery.appendChild(cardPicture);

}

export function getFolderName(folderName) {
    // Remplace toutes les occurrences de tiret (-) par des espaces pour séparer les mots dans le nom du dossier.
    folderName = folderName.replace(/-/g, ' ');

    // Supprime les espaces blancs au début et à la fin du nom du dossier.
    folderName = folderName.trim();

    // Divise le nom du dossier en un tableau de mots en utilisant l'espace comme séparateur.
    const words = folderName.split(' ');

    // Vérifie si le nombre de mots est supérieur à 1.
    if (words.length > 1) {
        // Si c'est le cas, retire le dernier mot du tableau.
        words.pop();

        // Rejoint les mots restants avec un espace entre eux pour reformer le nom du dossier sans le dernier mot.
        return words.join(' ');
    }

    // Si le nombre de mots n'est pas supérieur à 1 ou si aucun mot n'a été retiré, retourne simplement le nom du dossier tel quel.
    return folderName;
}


export function openMediaModal() {
    const mediaModal = document.querySelector(".media_modal");
    mediaModal.setAttribute("tabindex", 0)
    const lightbox = document.querySelector('.lightbox')
    mediaModal.style.display = "block";
    lightbox.focus()

}

export function swipeMedia(mediaSrc, mediaTitle) {
    checkIfExistingAndRemove('.media_zoom')
    checkIfExistingAndRemove('.media_zoom_name')
    let mediaElement
    if (mediaSrc.endsWith('.mp4')) {
        mediaElement = new Video(mediaSrc, mediaTitle);

    } else if (mediaSrc.endsWith('.jpg')) {
        mediaElement = new Image(mediaSrc, mediaTitle);

    }
    let newMediaZoom = mediaElement.renderForLightbox()
    let newNameZoom = mediaElement.renderNameForLightbox()
    let lightbox = document.querySelector(".lightbox")
    lightbox.prepend(newNameZoom)
    lightbox.prepend(newMediaZoom)
}

export function closeMediaModal() {
    const mediaModal = document.querySelector('.media_modal')
    mediaModal.style.display = "none"
}

export function createElementWithClass(elementType, className, textContent = null) {
    const element = document.createElement(elementType);
    element.classList.add(className);
    if (textContent !== null) {
        element.textContent = textContent;
    }
    return element;
}

export function createImageElement(src, className) {
    const image = document.createElement("img");
    image.setAttribute('src', src);
    image.classList.add(className);
    return image;
}

export function updateTotalNbrOfLikes() {
    const allNbrOfLikes = document.querySelectorAll(".nbrOfLikes");
    const countNbrOfLikes = Array.from(allNbrOfLikes).reduce((sum, element) => sum + parseFloat(element.textContent), 0);
    const totalLikes = document.querySelector(".total_likes");
    let totalNbrOfLikesElement = document.createElement('span');
    totalNbrOfLikesElement.textContent = countNbrOfLikes;
    const likesLogo2 = createImageElement("./assets/icons/like.png", "likes-logo");
    totalLikes.innerHTML = '';
    totalLikes.appendChild(totalNbrOfLikesElement);
    totalLikes.appendChild(likesLogo2);
}

export function addInactiveClass(element) {
    element.classList.remove("active")
    element.classList.add("inactive")
}
