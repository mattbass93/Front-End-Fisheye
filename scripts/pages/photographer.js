import { getPhotographers, isCurrentUrlMatch, updateTotalNbrOfLikes, displayPhotographerInfo, displayMediaItem } from "../utils/functions.js";
import { setupEventListeners } from "../utils/eventlisteners.js";

async function fetchAndDisplayData() {
    try {
        const photographersResult = await getPhotographers();
        console.log(photographersResult);

        if (!photographersResult) return;

        const currentUrl = window.location.href;
        const photographersAndMedia = photographersResult;

        photographersAndMedia.photographers.forEach(photographer => {
            if (isCurrentUrlMatch(currentUrl, photographer.id)) {
                displayPhotographerInfo(photographer);
            }
        });

        photographersAndMedia.media.forEach(mediaItem => {
            if (isCurrentUrlMatch(currentUrl, mediaItem.photographerId)) {
                displayMediaItem(mediaItem, photographersAndMedia);
            }
        });
        updateTotalNbrOfLikes();
        setupEventListeners();
    } catch (error) {
        console.error("Error fetching photographers:", error);
    }
}

fetchAndDisplayData();
