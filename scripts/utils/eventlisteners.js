import { closeMediaModal, updateAfterSort, addInactiveClass, checkIfExistingAndRemove } from "./functions.js";
import { Image, Video, } from "../utils/mediaitemsmanagement.js";



export function setupEventListeners() {
    //SELECTORS
    const spanCloseMediaZoom = document.getElementById("close_media_zoom")
    const nextMedia = document.getElementById('right')
    const previousMedia = document.getElementById('left')
    const sortImage = document.querySelector(".sort_image")

    let sortSpanInactive = document.querySelectorAll(".inactive")


    const popularityFilter = document.getElementById('popularity')
    const dateFilter = document.getElementById('date')
    const alphabetFilter = document.getElementById('alphabet')
    const sortButton = document.querySelector(".sort_button")

    const medias = document.querySelectorAll(".picture_gallery")
    const imgsNames = document.querySelectorAll(".picture_title")

    const mediasArray = Array.from(medias)
    const imgsNamesArray = Array.from(imgsNames)


    let currentIndex = 0;

    function swipeMedia(mediaSrc, mediaTitle) {
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
        let modalZoom = document.querySelector(".modal2")
        modalZoom.prepend(newNameZoom)
        modalZoom.prepend(newMediaZoom)
    }

    function handleImageClick(event, index) {
        currentIndex = index;
        const imageSrc = mediasArray[currentIndex].src;
        const mediaTitle = imgsNamesArray[currentIndex].textContent;
        swipeMedia(imageSrc, mediaTitle);
    }


    // // // LISTENERS
    mediasArray.forEach((media, index) => {
        media.addEventListener('click', event => handleImageClick(event, index));
        const imageSrc = media.src;
        const mediaTitle = imgsNamesArray[index].textContent;
    });

    nextMedia.addEventListener("click", () => {
        currentIndex++;
        if (currentIndex < mediasArray.length) {
            const imageSrc = mediasArray[currentIndex].src;
            const mediaTitle = imgsNamesArray[currentIndex].textContent;
            swipeMedia(imageSrc, mediaTitle);
        }
        else {
            currentIndex = 0
            const imageSrc = mediasArray[currentIndex].src;
            const mediaTitle = imgsNamesArray[currentIndex].textContent;
            swipeMedia(imageSrc, mediaTitle);
        }
    });
    nextMedia.addEventListener('keyup', function (event) {
        if (event.key === ' ' || event.key === "Enter") {
            currentIndex++;
            if (currentIndex < imgsArray.length) {
                const imageSrc = imgsArray[currentIndex].src;
                const mediaTitle = imgsNamesArray[currentIndex].textContent;
                swipeMedia(imageSrc, mediaTitle);
            }
            else {
                currentIndex = 0
                const imageSrc = imgsArray[currentIndex].src;
                const mediaTitle = imgsNamesArray[currentIndex].textContent;
                swipeMedia(imageSrc, mediaTitle);
            }
        }
    });

    previousMedia.addEventListener("click", () => {
        currentIndex--;
        if (currentIndex < imgsArray.length) {
            const imageSrc = imgsArray[currentIndex].src;
            const mediaTitle = imgsNamesArray[currentIndex].textContent;
            swipeMedia(imageSrc, mediaTitle);
        }
        else {
            currentIndex = imgsArray.findLastIndex()
            const imageSrc = imgsArray[currentIndex].src;
            const mediaTitle = imgsNamesArray[currentIndex].textContent;
            swipeMedia(imageSrc, mediaTitle);
        }
    });
    previousMedia.addEventListener('keyup', function (event) {
        if (event.key === ' ' || event.key === "Enter") {
            currentIndex--;
            if (currentIndex < mediasArray.length) {
                const imageSrc = mediasArray[currentIndex].src;
                const mediaTitle = imgsNamesArray[currentIndex].textContent;
                swipeMedia(imageSrc, mediaTitle);
            }
            else {
                currentIndex = mediasArray.findLastIndex()
                const imageSrc = mediasArray[currentIndex].src;
                const mediaTitle = imgsNamesArray[currentIndex].textContent;
                swipeMedia(imageSrc, mediaTitle);
            }
        }

    });


    spanCloseMediaZoom.addEventListener("click", () => {
        closeMediaModal()
    })
    spanCloseMediaZoom.addEventListener('keyup', function (event) {
        if (event.key === ' ' || event.key === "Enter") {
            closeMediaModal()
        }
    });

    sortImage.addEventListener("click", () => {
        sortImage.src = "./assets/icons/down.png"
        let sortSpanInactive = document.querySelectorAll(".inactive")

        sortSpanInactive.forEach(function (span) {
            span.classList.remove("inactive");
            span.classList.add("active");
        });

    })


    //Sort by POPULARITY, DATE, ALPHABET
    popularityFilter.addEventListener("click", () => {

        const pictureGalleries = document.querySelectorAll('.nbrOfLikes');

        const pictureGalleriesArray = Array.from(pictureGalleries);

        pictureGalleriesArray.sort((a, b) => parseInt(b.textContent) - parseInt(a.textContent));

        updateAfterSort(pictureGalleriesArray)
        addInactiveClass(alphabetFilter)
        addInactiveClass(dateFilter)
        sortImage.src = "./assets/icons/up.png"
        popularityFilter.style.order = "-1"

    });
    popularityFilter.addEventListener('keyup', function (event) {
        if (event.key === ' ' || event.key === "Enter") {
            const pictureGalleries = document.querySelectorAll('.nbrOfLikes');
            const pictureGalleriesArray = Array.from(pictureGalleries);
            pictureGalleriesArray.sort((a, b) => parseInt(b.textContent) - parseInt(a.textContent));
            updateAfterSort(pictureGalleriesArray)
        }
    })

    dateFilter.addEventListener('click', () => {
        let mediaItems = document.querySelectorAll(".picture_gallery")
        let mediaItemsArray = Array.from(mediaItems)

        mediaItemsArray.sort((a, b) => {
            const dateA = new Date(a.dataset.date);
            const dateB = new Date(b.dataset.date);
            return dateA - dateB;
        });
        console.log(mediaItemsArray)
        updateAfterSort(mediaItemsArray)
        addInactiveClass(alphabetFilter)
        addInactiveClass(popularityFilter)
        sortImage.src = "./assets/icons/up.png"
        dateFilter.style.order = "-1"
    });
    dateFilter.addEventListener('keyup', function (event) {
        if (event.key === ' ' || event.key === "Enter") {
            let mediaItems = document.querySelectorAll("img[data-date]")
            let mediaItemsArray = Array.from(mediaItems)

            mediaItemsArray.sort((a, b) => {
                const dateA = new Date(a.dataset.date);
                const dateB = new Date(b.dataset.date);
                return dateA - dateB;
            });
            updateAfterSort(mediaItemsArray)
        }
    });



    alphabetFilter.addEventListener("click", () => {
        const titles = document.querySelectorAll(".picture_title")
        const titlesArray = Array.from(titles);
        titlesArray.sort((a, b) => a.textContent.localeCompare(b.textContent));
        // document.querySelector('.photographer_gallery').innerHTML = ""
        // document.querySelector('.photographer_gallery').appendChild(titlesArray)

        console.log(titlesArray)
        updateAfterSort(titlesArray)
        addInactiveClass(dateFilter)
        addInactiveClass(popularityFilter)
        sortImage.src = "./assets/icons/up.png"
        alphabetFilter.style.order = "-1"
    })
    alphabetFilter.addEventListener('keyup', function (event) {
        if (event.key === ' ' || event.key === "Enter") {
            const titles = document.querySelectorAll(".picture_title")
            const titlesArray = Array.from(titles);
            titlesArray.sort((a, b) => a.textContent.localeCompare(b.textContent));
            updateAfterSort(titlesArray)
        }
    })
}



