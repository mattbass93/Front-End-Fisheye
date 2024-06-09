import { closeMediaModal, updateAfterSort } from "./functions.js";


export function setupEventListeners() {
    //SELECTORS
    const spanCloseMediaZoom = document.getElementById("close_media_zoom")
    const sortImage = document.querySelector(".sort_image")
    const sortSpanInactive = document.querySelectorAll(".inactive")
    const popularityFilter = document.getElementById('popularity')
    const dateFilter = document.getElementById('date')
    const alphabetFilter = document.getElementById('alphabet')
    const sortButton = document.querySelector(".sort_button")


    //LISTENERS
    spanCloseMediaZoom.addEventListener("click", () => {
        closeMediaModal()
    })

    sortButton.addEventListener("click", () => {
        sortImage.src = "./assets/icons/down.png"

        sortSpanInactive.forEach(function (span) {
            span.classList.remove("inactive");
            span.classList.add("active");
        });

    })

    popularityFilter.addEventListener("click", () => {

        const pictureGalleries = document.querySelectorAll('.nbrOfLikes');

        const pictureGalleriesArray = Array.from(pictureGalleries);

        pictureGalleriesArray.sort((a, b) => parseInt(b.textContent) - parseInt(a.textContent));

        updateAfterSort(pictureGalleriesArray)

    });

    dateFilter.addEventListener("click", () => {
        mediaItems.sort((a, b) => new Date(a.date) - new Date(b.date));
        console.log(mediaItems)

    })

    alphabetFilter.addEventListener("click", () => {

        const titles = document.querySelectorAll(".picture_title")

        const titlesArray = Array.from(titles);

        titlesArray.sort((a, b) => a.textContent.localeCompare(b.textContent));

        updateAfterSort(titlesArray)

    })
}


