import { getPhotographers, photographerTemplate } from "../utils/functions.js";

async function displayData(photographersAndMedia) {
    const photographersSection = document.querySelector(".photographer_section");

    // Traiter les photographes
    photographersAndMedia.photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer); // Assurez-vous que cette fonction est définie
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });

}

async function init() {
    const photographersAndMedia = await getPhotographers();
    displayData(photographersAndMedia);
}

init();

