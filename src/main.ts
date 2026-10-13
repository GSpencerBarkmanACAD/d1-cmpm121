// Vite turns this import into a production-safe URL. Keep it as a file so
// even this tiny example demonstrates a separately deployed asset.
// @deno-types="./asset-url.d.ts"
import grassBlockUrl from "./assets/grass-block.png?no-inline";
import woodenPickaxeUrl from "./assets/wooden-pickaxe.png?no-inline";
import stonePickaxeUrl from "./assets/stone-pickaxe.png?no-inline";
import woodenCursorUrl from "./assets/wooden-pickaxe-cursor.png?no-inline";
import stoneCursorUrl from "./assets/stone-pickaxe-cursor.png?no-inline";

const app = document.querySelector<HTMLElement>("#app")!;

const heading = document.createElement("h1");
heading.textContent = "Minecraft XP Clicker";

// Player XP and progression
let xp = 0;
let xpPerClick = 1;
let stoneOwned = false;
const stoneCost = 25;

const xpDisplay = document.createElement("p");
xpDisplay.textContent = `XP: ${xp}`;

// Clickable button
const mineButton = document.createElement("button");
mineButton.type = "button";
mineButton.setAttribute("aria-label", "Mine grass block for XP");

const image = document.createElement("img");
image.src = grassBlockUrl;
image.alt = "Grass block";
image.width = 180;
image.height = 180;

mineButton.append(image);

const clickPowerDisplay = document.createElement("p");

const stoneButton = document.createElement("button");
stoneButton.type = "button";

const pickaxeImage = document.createElement("img");
pickaxeImage.width = 72;
pickaxeImage.height = 72;

function updateDisplay() {
  xpDisplay.textContent = `XP: ${xp}`;

  const pickaxeName = stoneOwned ? "Stone Pickaxe" : "Wooden Pickaxe";

  clickPowerDisplay.textContent =
    `${pickaxeName} — XP per click: ${xpPerClick}`;

  pickaxeImage.src = stoneOwned ? stonePickaxeUrl : woodenPickaxeUrl;
  pickaxeImage.alt = pickaxeName;

  const cursorUrl = stoneOwned ? stoneCursorUrl : woodenCursorUrl;
  mineButton.style.cursor = `url("${cursorUrl}") 16 16, pointer`;

  stoneButton.disabled = stoneOwned || xp < stoneCost;

  stoneButton.textContent = stoneOwned
    ? "Stone Pickaxe Purchased"
    : `Buy Stone Pickaxe - ${stoneCost} XP`;
}

// Earn XP and update display on button click
mineButton.addEventListener("click", () => {
  xp += xpPerClick;
  updateDisplay();
});

stoneButton.addEventListener("click", () => {
  if (stoneOwned || xp < stoneCost) {
    return;
  }

  xp -= stoneCost;
  xpPerClick = 2;
  stoneOwned = true;

  updateDisplay();
});

app.append(
  heading,
  pickaxeImage,
  mineButton,
  xpDisplay,
  clickPowerDisplay,
  stoneButton,
);

updateDisplay();
