// Import statements remain unchanged
import { getPhotographers, isCurrentUrlMatch, updateTotalNbrOfLikes, displayPhotographerInfo, displayMediaItem } from "../utils/functions.js";
import { setupEventListeners } from "../utils/eventlisteners.js";

async function fetchAndDisplayData() {
    try {
        const photographersResult = await getPhotographers();
        console.log(photographersResult);

        if (!photographersResult) return;

        const currentUrl = window.location.href;
        const photographersAndMedia = photographersResult;

        // Display photographer info if URL matches
        photographersAndMedia.photographers.forEach(photographer => {
            if (isCurrentUrlMatch(currentUrl, photographer.id)) {
                displayPhotographerInfo(photographer);
            }
        });

        // Display media item if URL matches
        photographersAndMedia.media.forEach(mediaItem => {
            if (isCurrentUrlMatch(currentUrl, mediaItem.photographerId)) {
                displayMediaItem(mediaItem, photographersAndMedia);
            }
        });

        // Update total likes and set up event listeners
        updateTotalNbrOfLikes();
        setupEventListeners();

    } catch (error) {
        console.error("Error fetching photographers:", error);
    }
}

fetchAndDisplayData();
