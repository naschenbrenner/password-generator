const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz"
const numbers = "0123456789"
const specialChars = "~`!@#$%^&*()_-+=[]{},|:;<>.?/"

let passwordLength = 15

document.getElementById("lengthSlider").oninput = function () {
    passwordLength = this.value
    document.getElementById("lengthValue").textContent = passwordLength
}

function getRandomCharacter(pool) {
    let randomIndex = Math.floor(Math.random() * pool.length)
    return pool[randomIndex]
}

function generateRandomPassword() {
    let characterPool = upperCaseLetters + lowerCaseLetters

    if (document.getElementById("toggleNumbers").checked) {
        characterPool += numbers
    }
    if (document.getElementById("toggleSpecial").checked) {
        characterPool += specialChars
    }

    let randomPassword = ""
    for (let i = 0; i < passwordLength; i++) {
        randomPassword += getRandomCharacter(characterPool)
    }
    return randomPassword
}

function generatePasswords() {
    let password1 = document.getElementById("password1")
    let password2 = document.getElementById("password2")

    password1.textContent = generateRandomPassword()
    password2.textContent = generateRandomPassword()

    updateTooltip(password1)
    updateTooltip(password2)
}

function copyToClipboard(passwordElement) {
    let passwordText = passwordElement.textContent
    if (passwordText) {
        navigator.clipboard.writeText(passwordText).then(() => {
            passwordElement.setAttribute("data-tooltip", "Copied!")
            setTimeout(() => updateTooltip(passwordElement), 1500)
        }).catch(err => {
            console.error("Failed to copy: ", err)
        })
    }
}

function updateTooltip(element) {
    if (element.textContent) {
        element.setAttribute("data-tooltip", "Copy to clipboard")
        element.classList.add("active")
    } else {
        element.removeAttribute("data-tooltip")
        element.classList.remove("active")
    }
}

document.addEventListener("DOMContentLoaded", () => {
    let password1 = document.getElementById("password1")
    let password2 = document.getElementById("password2")

    password1.addEventListener("click", () => copyToClipboard(password1))
    password2.addEventListener("click", () => copyToClipboard(password2))

    updateTooltip(password1)
    updateTooltip(password2)
})
