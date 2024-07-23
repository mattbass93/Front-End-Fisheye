import { closeMediaModal, addInactiveClass, swipeMedia } from "./functions.js";


export function setupEventListeners() {
    //SELECTORS
    const spanCloseMediaZoom = document.getElementById("close_media_zoom")
    const nextMedia = document.getElementById('right')
    const previousMedia = document.getElementById('left')
    const sortImage = document.querySelector(".sort_image")
    const popularityFilter = document.getElementById('popularity')
    const dateFilter = document.getElementById('date')
    const alphabetFilter = document.getElementById('alphabet')
    let medias = document.querySelectorAll(".picture_gallery")
    let imgsNames = document.querySelectorAll(".picture_title")
    let mediasArray = Array.from(medias)
    let imgsNamesArray = Array.from(imgsNames)
    let currentIndex = 0;


    function updateMediasAndTitles() {
        medias = document.querySelectorAll(".picture_gallery");
        imgsNames = document.querySelectorAll(".picture_title");

        mediasArray = Array.from(medias);
        imgsNamesArray = Array.from(imgsNames);

        currentIndex = 0;

        addListenerMedias(mediasArray)
    }


    function handleImageClick(event, index) {
        currentIndex = index;
        const imageSrc = mediasArray[currentIndex].src;
        const mediaTitle = imgsNamesArray[currentIndex].textContent;
        swipeMedia(imageSrc, mediaTitle);
    }


    // // // LISTENERS
    function addListenerMedias(mediasArray) {
        mediasArray.forEach((media, index) => {
            media.addEventListener('click', event => handleImageClick(event, index));
            media.addEventListener('keyup', event => {
                if (event.key === "Enter") {
                    handleImageClick(event, index);
                }
            });
        });
    }

    addListenerMedias(mediasArray)


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
        if (event.key === "Enter") {
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
        }
    });

    previousMedia.addEventListener("click", () => {
        currentIndex--;
        if (currentIndex >= 0 && currentIndex < mediasArray.length) {
            const imageSrc = mediasArray[currentIndex].src;
            const mediaTitle = imgsNamesArray[currentIndex].textContent;
            swipeMedia(imageSrc, mediaTitle);
        } else {
            currentIndex = mediasArray.length - 1;
            const imageSrc = mediasArray[currentIndex].src;
            const mediaTitle = imgsNamesArray[currentIndex].textContent;
            swipeMedia(imageSrc, mediaTitle);
        }
    });
    previousMedia.addEventListener('keyup', function (event) {
        if (event.key === "Enter") {
            currentIndex--;
            if (currentIndex >= 0 && currentIndex < mediasArray.length) {
                const imageSrc = mediasArray[currentIndex].src;
                const mediaTitle = imgsNamesArray[currentIndex].textContent;
                swipeMedia(imageSrc, mediaTitle);
            } else {
                currentIndex = mediasArray.length - 1;
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
        if (event.key === "Enter") {
            closeMediaModal()
        }
    });



    //Sort by POPULARITY, DATE, ALPHABET
    sortImage.addEventListener("click", () => {
        if (sortImage.src.includes("down.png")) {
            sortImage.src = "./assets/icons/up.png";

            let sortSpansActive = document.querySelectorAll(".active");

            sortSpansActive.forEach(span => {
                span.classList.remove("active");
                span.classList.add("inactive");
            });
            sortSpansActive = document.querySelectorAll(".active");
            let sortSpansInactive = document.querySelectorAll(".inactive");
            sortSpansInactive[0].classList.remove("inactive");
            sortSpansInactive[0].classList.add("active");

        } else {
            sortImage.src = "./assets/icons/down.png";
            let sortSpansInactive = document.querySelectorAll(".inactive");
            sortSpansInactive.forEach(span => {
                span.classList.remove("inactive");
                span.classList.add("active");
            });
        }
    });


    sortImage.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            if (sortImage.src.includes("down.png")) {
                sortImage.src = "./assets/icons/up.png";

                let sortSpansActive = document.querySelectorAll(".active");

                sortSpansActive.forEach(span => {
                    span.classList.remove("active");
                    span.classList.add("inactive");
                });
                sortSpansActive = document.querySelectorAll(".active");
                let sortSpansInactive = document.querySelectorAll(".inactive");
                sortSpansInactive[0].classList.remove("inactive");
                sortSpansInactive[0].classList.add("active");

            } else {
                sortImage.src = "./assets/icons/down.png";
                let sortSpansInactive = document.querySelectorAll(".inactive");
                sortSpansInactive.forEach(span => {
                    span.classList.remove("inactive");
                    span.classList.add("active");
                });
            }
        }

    })

    popularityFilter.addEventListener("click", () => {
        const nbrOfLikesPerMedia = document.querySelectorAll('.nbrOfLikes');
        const nbrOfLikesPerMediaArray = Array.from(nbrOfLikesPerMedia).sort((a, b) => parseInt(a.textContent) - parseInt(b.textContent));

        const container = document.querySelector('.photographer_gallery');
        container.innerHTML = "";

        nbrOfLikesPerMediaArray.forEach(nbrOfLikes => {
            const cardPicture = nbrOfLikes.closest('.card_picture');
            container.insertBefore(cardPicture, container.firstChild);
        });

        addInactiveClass(alphabetFilter)
        addInactiveClass(dateFilter)
        sortImage.src = "./assets/icons/up.png"
        popularityFilter.style.order = "-1"

        updateMediasAndTitles();

    });

    popularityFilter.addEventListener('keyup', function (event) {
        if (event.key === "Enter") {
            const nbrOfLikesPerMedia = document.querySelectorAll('.nbrOfLikes');
            const nbrOfLikesPerMediaArray = Array.from(nbrOfLikesPerMedia).sort((a, b) => parseInt(a.textContent) - parseInt(b.textContent));
            const container = document.querySelector('.photographer_gallery');
            container.innerHTML = "";
            nbrOfLikesPerMediaArray.forEach(nbrOfLikes => {
                const cardPicture = nbrOfLikes.closest('.card_picture');
                container.insertBefore(cardPicture, container.firstChild);
            });

            addInactiveClass(alphabetFilter)
            addInactiveClass(dateFilter)
            sortImage.src = "./assets/icons/up.png"
            popularityFilter.style.order = "-1"

            updateMediasAndTitles();
        }
    })

    dateFilter.addEventListener('click', () => {
        let mediaItems = document.querySelectorAll(".picture_gallery");
        let mediaItemsArray = Array.from(mediaItems);

        mediaItemsArray.sort((a, b) => {
            const dateA = new Date(a.getAttribute('data-date'));
            const dateB = new Date(b.getAttribute('data-date'));
            return dateA - dateB;
        });

        const container = document.querySelector('.photographer_gallery');
        container.innerHTML = "";

        mediaItemsArray.forEach(mediaItem => {
            const cardPicture = mediaItem.closest('.card_picture')
            container.insertBefore(cardPicture, container.firstChild);
        });

        addInactiveClass(alphabetFilter);
        addInactiveClass(popularityFilter);
        sortImage.src = "./assets/icons/up.png";
        dateFilter.style.order = "-1";

        updateMediasAndTitles();
    });

    dateFilter.addEventListener('keyup', function (event) {
        if (event.key === "Enter") {
            let mediaItems = document.querySelectorAll(".picture_gallery");
            let mediaItemsArray = Array.from(mediaItems);

            mediaItemsArray.sort((a, b) => {
                const dateA = new Date(a.getAttribute('data-date'));
                const dateB = new Date(b.getAttribute('data-date'));
                return dateA - dateB;
            });

            const container = document.querySelector('.photographer_gallery');
            container.innerHTML = "";

            mediaItemsArray.forEach(mediaItem => {
                const cardPicture = mediaItem.closest('.card_picture')
                container.insertBefore(cardPicture, container.firstChild);
            });

            addInactiveClass(alphabetFilter);
            addInactiveClass(popularityFilter);
            sortImage.src = "./assets/icons/up.png";
            dateFilter.style.order = "-1";

            updateMediasAndTitles();
        }
    });

    alphabetFilter.addEventListener("click", () => {
        const titles = document.querySelectorAll(".picture_title");
        const sortedTitles = Array.from(titles).sort((a, b) => b.textContent.localeCompare(a.textContent));

        const container = document.querySelector('.photographer_gallery');
        container.innerHTML = "";

        sortedTitles.forEach(title => {
            const cardPicture = title.closest('.card_picture');
            container.insertBefore(cardPicture, container.firstChild);
        });

        addInactiveClass(dateFilter);
        addInactiveClass(popularityFilter);
        sortImage.src = "./assets/icons/up.png";
        alphabetFilter.style.order = "-1";

        updateMediasAndTitles();
    });

    alphabetFilter.addEventListener('keyup', function (event) {
        if (event.key === "Enter") {
            const titles = document.querySelectorAll(".picture_title");
            const sortedTitles = Array.from(titles).sort((a, b) => b.textContent.localeCompare(a.textContent));

            const container = document.querySelector('.photographer_gallery');
            container.innerHTML = "";

            sortedTitles.forEach(title => {
                const cardPicture = title.closest('.card_picture');
                container.insertBefore(cardPicture, container.firstChild);
            });

            addInactiveClass(dateFilter);
            addInactiveClass(popularityFilter);
            sortImage.src = "./assets/icons/up.png";
            alphabetFilter.style.order = "-1";

            updateMediasAndTitles();
        }
    })


}



