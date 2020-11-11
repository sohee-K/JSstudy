function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    event.target.appendChild(document.getElementsByClassName(data)[0]);
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.className);
}