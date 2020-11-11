const imageContainer = document.querySelector(".image-container");
const goLeft = document.querySelector(".go-left");
const goRight = document.querySelector(".go-right");
const text = document.querySelector(".text");

const maxNum = 5;
let currentIndex = 0;

function handleLeftClick() {
    const images = document.querySelectorAll("img");

    images[currentIndex].classList.add("hide");
    currentIndex--;
    currentIndex = (currentIndex < 0) ? maxNum - 1 : currentIndex;
    images[currentIndex].classList.remove("hide");
    text.innerHTML = `${currentIndex + 1}/${maxNum}`;
}

function handleRightClick() {
    const images = document.querySelectorAll("img");

    images[currentIndex].classList.add("hide");
    currentIndex++;
    currentIndex = (currentIndex >= maxNum) ? 0 : currentIndex;
    images[currentIndex].classList.remove("hide");
    text.innerHTML = `${currentIndex + 1}/${maxNum}`;
}

function showImage() {
    const images = document.querySelectorAll("img");
    images[currentIndex].classList.remove("hide");
    text.innerHTML = `${currentIndex + 1}/${maxNum}`;
}

function createImage() {
    for (let i = 0; i < maxNum; i++) {
        const image = document.createElement("img");
        image.src = `./images/${i + 1}.jpg`;
        image.classList.add("hide");
        imageContainer.appendChild(image);
    }
}

function init() {
    createImage();
    showImage();
    goLeft.addEventListener("click", handleLeftClick);
    goRight.addEventListener("click", handleRightClick);
}

init();