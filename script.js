let cookieCount = 0;
let autoClickRate = 0;
let cookiesPerClick = 1;
let autoClickMultiplier = 1;  // Denne variabelen holder styr på hvor mange ganger auto-click multipliseres
let autoClickCost = 10;
let backgroundCost = 20;
let clickMultiplierCost = 50;

const cookie = document.getElementById("cookie");
const cookieCountDisplay = document.getElementById("cookieCount");
const upgradeButton = document.getElementById("upgradeButton");
const autoClickDisplay = document.getElementById("autoClick");
const backgroundButton = document.getElementById("backgroundButton");
const clickMultiplierButton = document.getElementById("clickMultiplierButton");
const cookiesPerClickDisplay = document.getElementById("cookiesPerClick");

// Når brukeren klikker på kaken, øker antall cookies
cookie.addEventListener("click", () => {
    cookieCount += cookiesPerClick;
    updateDisplay();
});

// Oppdaterer antall cookies og knapper
function updateDisplay() {
    cookieCountDisplay.textContent = cookieCount;
    cookiesPerClickDisplay.textContent = cookiesPerClick;
    upgradeButton.textContent = `Kjøp Auto-Clicker (${autoClickCost} cookies)`;
    backgroundButton.textContent = `Endre bakgrunnsfarge (${backgroundCost} cookies)`;
    clickMultiplierButton.textContent = `Klikkmultiplikator (${clickMultiplierCost} cookies)`;

    upgradeButton.disabled = cookieCount < autoClickCost;
    backgroundButton.disabled = cookieCount < backgroundCost;
    clickMultiplierButton.disabled = cookieCount < clickMultiplierCost;
}

// Oppgradering for auto-klikk
upgradeButton.addEventListener("click", () => {
    if (cookieCount >= autoClickCost) {
        cookieCount -= autoClickCost;
        autoClickRate++;  // Øker antall auto-clicks per sekund
        autoClickDisplay.textContent = autoClickRate;
        autoClickCost = Math.ceil(autoClickCost * 1.5); // Øker prisen for hver gang
        updateDisplay();
    }
});

// Auto-klikk funksjon som øker cookies over tid
setInterval(() => {
    cookieCount += autoClickRate * autoClickMultiplier;  // Multipliserer auto-clicks med multiplikatoren
    updateDisplay();
}, 1000);

// Funksjon for å endre bakgrunnsfargen
backgroundButton.addEventListener("click", () => {
    if (cookieCount >= backgroundCost) {
        cookieCount -= backgroundCost;
        backgroundCost = Math.ceil(backgroundCost * 1.5); // Øker prisen for hver gang
        document.body.style.backgroundColor = getRandomColor();
        updateDisplay();
    }
});

// Genererer en tilfeldig farge
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Kjøp klikkmultiplikator som dobler antall cookies per klikk OG auto-click
clickMultiplierButton.addEventListener("click", () => {
    if (cookieCount >= clickMultiplierCost) {
        cookieCount -= clickMultiplierCost;
        cookiesPerClick *= 2; // Dobler antall cookies per klikk
        autoClickMultiplier *= 2; // Dobler antall cookies fra auto-click
        clickMultiplierCost = Math.ceil(clickMultiplierCost * 2); // Øker prisen for hver gang
        updateDisplay();
    }
});
