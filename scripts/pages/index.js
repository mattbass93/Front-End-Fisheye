import { getPhotographers, photographerTemplate } from "../utils/functions.js";

async function displayData(photographersAndMedia) {
    const photographersSection = document.querySelector(".photographer_section");

    photographersAndMedia.photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });

}

async function init() {
    const photographersAndMedia = await getPhotographers();
    console.log(photographersAndMedia)
    displayData(photographersAndMedia);
}

init();

