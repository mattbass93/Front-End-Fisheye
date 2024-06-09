export async function getPhotographers() {
    const response = await fetch("./data/photographers.json");
    const photographersAndMedia = await response.json();
    return photographersAndMedia; // Retourne l'objet contenant à la fois des photographes et des médias
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





        // article.appendChild(img);
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

export function openMediaModal(imageSrc, mediaTitle) {
    const mediaModal = document.querySelector(".media_modal")
    mediaModal.style.display = "block"

    const mediaZoom = document.querySelector('.media_zoom')
    mediaZoom.src = imageSrc;
    mediaZoom.setAttribute("alt", mediaTitle)

    const mediaZoomTitle = document.querySelector('.media_zoom_name')
    mediaZoomTitle.textContent = mediaTitle

    const modal2 = document.querySelector('.modal2')
    modal2.focus()
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

export function getFolderName(folderName) {
    folderName = folderName.replace(/-/g, ' ');
    folderName = folderName.trim();
    const words = folderName.split(' ');
    // Supprimez le dernier mot
    if (words.length > 1) { // Assurez-vous qu'il y a plus d'un mot pour éviter une erreur
        words.pop(); // Supprime le dernier élément du tableau

        return words.join(' '); // Rejoignez les mots restants en une seule chaîne avec des espaces entre eux
    }
}

export function updateTotalNbrOfLikes() {
    const allNbrOfLikes = document.querySelectorAll(".nbrOfLikes");
    console.log(allNbrOfLikes)
    const countNbrOfLikes = Array.from(allNbrOfLikes).reduce((sum, element) => sum + parseFloat(element.textContent), 0);
    console.log(countNbrOfLikes)

    const totalLikes = document.querySelector(".total_likes");

    // Créez et initialisez totalNbrOfLikes et likesLogo2 ici
    let totalNbrOfLikesElement = document.createElement('span');
    totalNbrOfLikesElement.textContent = countNbrOfLikes;

    const likesLogo2 = createImageElement("./assets/icons/like.png", "likes-logo");

    // Remplacez le contenu existant de totalLikes
    totalLikes.innerHTML = '';
    totalLikes.appendChild(totalNbrOfLikesElement);
    totalLikes.appendChild(likesLogo2);
}

export function updateAfterSort(element) {
    let index = 1

    element.forEach(function (card) {
        card.closest('.card_picture').style.order = index;
        index++
    })
}