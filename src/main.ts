// Vite turns this import into a production-safe URL. Keep it as a file so
// even this tiny example demonstrates a separately deployed asset.
// @deno-types="./asset-url.d.ts"
import grassBlockUrl from "./assets/grass-block.png?no-inline";

import { pickaxes } from "./pickaxes.ts";

const app = document.querySelector<HTMLElement>("#app")!;

const heading = document.createElement("h1");
heading.textContent = "Minecraft XP Clicker";

// Player XP and progression
let xp = 0;
let currentPickaxeIndex = 0;

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

const upgradeButton = document.createElement("button");
upgradeButton.type = "button";

const pickaxeImage = document.createElement("img");
pickaxeImage.width = 72;
pickaxeImage.height = 72;

function updateDisplay() {
  const currentPickaxe = pickaxes[currentPickaxeIndex]!;
  const nextPickaxe = pickaxes[currentPickaxeIndex + 1];

  xpDisplay.textContent = `XP: ${xp}`;

  clickPowerDisplay.textContent =
    `${currentPickaxe.name} — XP per click: ${currentPickaxe.xpPerClick}`;

  pickaxeImage.src = currentPickaxe.imageUrl;
  pickaxeImage.alt = currentPickaxe.name;

  // Pickaxe cursor
  mineButton.style.cursor = `url("${currentPickaxe.cursorUrl}") 16 16, pointer`;

  upgradeButton.disabled = !nextPickaxe || xp < nextPickaxe.cost;

  upgradeButton.textContent = nextPickaxe
    ? `Buy ${nextPickaxe.name} — ${nextPickaxe.cost} XP`
    : "All pickaxes purchased";
}

// Earn XP and update display on button click
mineButton.addEventListener("click", () => {
  const currentPickaxe = pickaxes[currentPickaxeIndex]!;
  xp += currentPickaxe.xpPerClick;
  updateDisplay();
});

upgradeButton.addEventListener("click", () => {
  const nextPickaxe = pickaxes[currentPickaxeIndex + 1];

  if (!nextPickaxe || xp < nextPickaxe.cost) {
    return;
  }

  xp -= nextPickaxe.cost;
  currentPickaxeIndex += 1;

  updateDisplay();
});

app.append(
  heading,
  pickaxeImage,
  mineButton,
  xpDisplay,
  clickPowerDisplay,
  upgradeButton,
);

updateDisplay();
