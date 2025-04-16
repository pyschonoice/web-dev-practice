const boxes = document.querySelectorAll('.box');
const body = document.body;
const title = document.getElementById('title');
const customTitle = document.getElementById('custom-title');
const addColor = document.getElementById('addColor');
const colorPicker = document.getElementById('colorPicker');
import { colorNames } from "./colorNames.js";

boxes.forEach(div => {
    div.addEventListener('click', () => {
        let color = div.id !== "default" ? div.id : "white";
        applyColorTheme(color);
    });
});

addColor.addEventListener('click', () => {
    const color = colorPicker.value.toLowerCase();
    addComponent(color);
    saveColor(color);
});

function addComponent(color) {
    const colorBox = document.getElementById("color-options-custom");

    const label = getColorNameOrHex(color);

    const div = document.createElement("div");
    div.className = "box";
    div.id = label;
    div.innerText = label;
    div.style.backgroundColor = color;
    div.style.color = getContrastColor(color);

    div.addEventListener('click', () => applyColorTheme(color));
    div.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        colorBox.removeChild(div);
        removeColor(color);
    });
    colorBox.appendChild(div);
}

function applyColorTheme(color) {
    body.style.backgroundColor = color;
    title.style.color = getContrastColor(color);
    customTitle.style.color = getContrastColor(color);
}

function getContrastColor(bgColor) {
    const temp = document.createElement("div");
    temp.style.backgroundColor = bgColor;
    document.body.appendChild(temp);

    const rgb = getComputedStyle(temp).backgroundColor;
    document.body.removeChild(temp);

    const [r, g, b] = rgb.match(/\d+/g).map(Number);
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    return brightness > 125 ? 'black' : 'white';
}

function getColorNameOrHex(color) {
    const canvas = document.createElement("canvas").getContext("2d");
    canvas.fillStyle = color;
    const hex = canvas.fillStyle;

    const names = colorNames;

    for (let name in names) {
        if (names[name].toLowerCase() === hex.toLowerCase()) {
            return name;
        }
    }

    return hex;
}

function saveColor(color) {
    const stored = JSON.parse(localStorage.getItem("customColors")) || [];
    if (!stored.includes(color)) {
        stored.push(color);
        localStorage.setItem("customColors", JSON.stringify(stored));
    }
}

function removeColor(color) {
    let stored = JSON.parse(localStorage.getItem("customColors")) || [];
    stored = stored.filter(c => c !== color);
    localStorage.setItem("customColors", JSON.stringify(stored));
}


function loadCustomColors() {
    const stored = JSON.parse(localStorage.getItem("customColors")) || [];
    stored.forEach(color => addComponent(color));
}

const clearBtn = document.getElementById('clearAll');

clearBtn.addEventListener('click', () => {
    localStorage.removeItem("customColors");
    document.getElementById("color-options-custom").innerHTML = "";
});

loadCustomColors();
