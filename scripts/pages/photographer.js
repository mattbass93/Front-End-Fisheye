import { Image, Video, } from "../utils/mediaitemsmanagement.js";
import { getPhotographers, isCurrentUrlMatch, createElementWithClass, getFolderName, createImageElement, updateTotalNbrOfLikes } from "../utils/functions.js";
import { setupEventListeners } from "../utils/eventlisteners.js";

function displayPhotographerInfo(photographer) {
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


await getPhotographers().then((resultat) => {
    console.log(resultat.media)
    if (resultat) {
        const currentUrl = window.location.href;
        let photographersAndMedia = resultat; // Assignation de la valeur résolue à photographersAndMedia

        photographersAndMedia.photographers.forEach(photographer => {
            if (isCurrentUrlMatch(currentUrl, photographer.id)) {
                displayPhotographerInfo(photographer);
            }
        });


        console.log(photographersAndMedia.media)
        photographersAndMedia.media.forEach(function (mediaItems) {
            if (isCurrentUrlMatch(currentUrl, mediaItems.photographerId)) {
                displayMediaItem(mediaItems, photographersAndMedia);
            }
        })



        updateTotalNbrOfLikes();
    }

}).catch((erreur) => {
    console.error("Erreur lors de la récupération des photographes :", erreur);
});


function displayMediaItem(mediaItem, photographersAndMedia) {
    const photographGallery = document.querySelector('.photographer_gallery');
    const cardPicture = createElementWithClass("div", "card_picture");


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
        cardPicture.appendChild(mediaElementHtml);
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

    likes.appendChild(nbrOfLikes);
    likes.appendChild(likesLogo);
    cardPicture.appendChild(description);
    description.appendChild(pictureTitle);
    description.appendChild(likes);
    photographGallery.appendChild(cardPicture);

    // console.log(mediaItem.date)
}

setupEventListeners()