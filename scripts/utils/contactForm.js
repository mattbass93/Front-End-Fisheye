import { getPhotographers, isCurrentUrlMatch } from "./functions.js";


getPhotographers().then((photographersAndMedia) => {
    const currentUrl = window.location.href;

    for (const photographer of photographersAndMedia.photographers) {
        if (isCurrentUrlMatch(currentUrl, photographer.id)) {
            h2Form.textContent = `Contactez moi ${photographer.name}`;
            h2Form.setAttribute("aria-label", `Contact me ${photographer.name}`)
        }
    }
});

const h2Form = document.querySelector("h2")
const firstname = document.getElementById('firstname')
const lastname = document.getElementById('lastname')
const email = document.getElementById('email')
const message = document.getElementById('your_message')
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

function checkIfExistingErrorMessage(errorId) {
    const existingErrorMessage = document.getElementById(errorId);
    if (existingErrorMessage) {
        existingErrorMessage.remove();
        return true
    }
}

function addSpanError(tag, id, errorMessage) {
    if (tag.classList.contains("error")) {
        const newSpan = document.createElement("span");
        newSpan.textContent = errorMessage;
        newSpan.id = id
        newSpan.classList.add("error_message");
        tag.insertAdjacentElement('afterend', newSpan);
        return false
    }
}

function addValidClass(tag) {
    tag.classList.remove("error");
    tag.classList.add("valid");
}

function addErrorClass(tag) {
    tag.classList.remove("valid");
    tag.classList.add("error");
}

function checkRegExp(tag, regex) {
    let regExp = new RegExp(regex);

    if (regExp.test(tag.value) && tag.value.length >= 2) {
        addValidClass(tag)
        return true
    } else {
        addErrorClass(tag)
        return false
    }
}

function checkField(tag, regex, errorId, errorMessage) {
    checkIfExistingErrorMessage(errorId);

    if (!checkRegExp(tag, regex)) {
        addSpanError(tag, errorId, errorMessage);
        return false
    } else {
        return true
    }
}





form.addEventListener("submit", (event) => {
    event.preventDefault()

    checkField(firstname, "^[A-Z][A-Za-z\\é\\è\\ê\\-]+$", 'firstNameSpan', "Veuillez indiquer un prénom valide"),
        checkField(lastname, "^[A-Z][a-z\\-' ]+$", 'lastNameSpan', "Veuillez indiquer un nom valide"),
        checkField(email, "[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+", 'emailSpan', "Veuillez indiquer une adresse mail valide")

    if (checkField(firstname, "^[A-Z][A-Za-z\\é\\è\\ê\\-]+$", 'firstNameSpan', "Veuillez indiquer un prénom valide") &&
        checkField(lastname, "^[A-Z][a-z\\-' ]+$", 'lastNameSpan', "Veuillez indiquer un nom valide") &&
        checkField(email, "[a-z0-9._-]+@[a-z0-9._-]+\\.[a-z0-9._-]+", 'emailSpan', "Veuillez indiquer une adresse mail valide")) {
        console.log(`Prénom : ${firstname.value}`)
        console.log(`Nom : ${lastname.value}`)
        console.log(`Email : ${email.value}`)
        console.log(`Message : ${message.value}`)
    }



})