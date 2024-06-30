import { getPhotographers, isCurrentUrlMatch } from "./functions.js";


getPhotographers().then((photographersAndMedia) => {
    const currentUrl = window.location.href;

    for (const photographer of photographersAndMedia.photographers) {
        if (isCurrentUrlMatch(currentUrl, photographer.id)) {
            const name = document.createElement("span")
            h2Form.textContent = `Contactez moi ${photographer.name}`;
        }
    }
});

const header = document.getElementById("modal_header")
const h2Form = document.querySelector("h2")
const firstname = document.getElementById('firstname')
const lastname = document.getElementById('lastname')
const email = document.getElementById('email')
const message = document.getElementById('message')
const form = document.querySelector('form')
const modal = document.getElementById("modal")

function displayModal() {
    const contactModal = document.getElementById("contact_modal");
    contactModal.style.display = "block";
    modal.setAttribute("tabindex", 0)
    modal.focus()
}

function closeModal() {
    const contactModal = document.getElementById("contact_modal");
    contactModal.style.display = "none";
}

const contactButton = document.querySelector(".contact_button")

contactButton.addEventListener("click", () => {
    displayModal()
})

const spanCloseModal = document.querySelector(".close_modal")

spanCloseModal.addEventListener("click", () => {
    closeModal()
})

spanCloseModal.addEventListener('keyup', function (event) {
    if (event.key === ' ' || event.key === "Enter") {
        closeModal()
    }
});



form.addEventListener("submit", (event) => {
    event.preventDefault()

    console.log(`Prénom : ${firstname.value}`)
    console.log(`Nom : ${lastname.value}`)
    console.log(`Email : ${email.value}`)
    console.log(`Message : ${message.value}`)

})