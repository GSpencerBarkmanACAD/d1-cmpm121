// Vite turns this import into a production-safe URL. Keep it as a file so
// even this tiny example demonstrates a separately deployed asset.
// @deno-types="./asset-url.d.ts"
import grassBlockUrl from "./assets/grass-block.png?no-inline";
import { pickaxes } from "./pickaxes.ts";
import { farms } from "./farms.ts";

const app = document.querySelector<HTMLElement>("#app")!;

const heading = document.createElement("h1");
heading.textContent = "Minecraft XP Clicker";

// Player XP and progression
let xp = 0;
let totalXp = 0;
let currentPickaxeIndex = 0;

const xpDisplay = document.createElement("p");
xpDisplay.textContent = `XP: ${xp}`;

const image = document.createElement("img");
image.src = grassBlockUrl;
image.alt = "Grass block";
image.width = 180;
image.height = 180;

const clickPowerDisplay = document.createElement("p");

// Buttons:
// Main button
const mineButton = document.createElement("button");
mineButton.type = "button";
mineButton.setAttribute("aria-label", "Mine grass block for XP");
mineButton.append(image);

// Upgrade Pickaxe
const upgradePickaxeButton = document.createElement("button");
upgradePickaxeButton.type = "button";

// Upgrade Villager Farm
const upgradeFarmVButton = document.createElement("button");
upgradeFarmVButton.type = "button";
upgradeFarmVButton.style.display = "none"; // Initially hidden

// Upgrade Spawner Farm
const upgradeFarmSButton = document.createElement("button");
upgradeFarmSButton.type = "button";
upgradeFarmSButton.style.display = "none"; // Initially hidden

//========//

const pickaxeImage = document.createElement("img");
pickaxeImage.width = 72;
pickaxeImage.height = 72;

const farmVContainer = document.createElement("div");
const farmSContainer = document.createElement("div");

function addFarmImage(container: HTMLDivElement, url: string, alt: string) {
  const farmImage = document.createElement("img");
  farmImage.src = url;
  farmImage.alt = alt;
  farmImage.width = 72;
  farmImage.height = 72;
  container.appendChild(farmImage);
}

function updateDisplay() {
  const currentPickaxe = pickaxes[currentPickaxeIndex]!;
  const nextPickaxe = pickaxes[currentPickaxeIndex + 1];
  const farmV = farms[0];
  const farmS = farms[1];

  xpDisplay.textContent = `XP: ${Math.floor(xp)} (Total XP: ${
    Math.floor(totalXp)
  })`;

  clickPowerDisplay.textContent =
    `${currentPickaxe.name} — XP per click: ${currentPickaxe.xpPerClick}`;

  pickaxeImage.src = currentPickaxe.imageUrl;
  pickaxeImage.alt = currentPickaxe.name;

  // Pickaxe cursor
  mineButton.style.cursor = `url("${currentPickaxe.cursorUrl}") 16 16, pointer`;

  // Ugrade Buttons Functionality and Display
  upgradePickaxeButton.disabled = !nextPickaxe || xp < nextPickaxe.cost;

  upgradeFarmVButton.disabled = xp < farmV.cost;
  upgradeFarmVButton.style.display = totalXp >= 150 ? "inline-block" : "none";

  upgradeFarmSButton.disabled = xp < farmS.cost;
  upgradeFarmSButton.style.display = totalXp >= 3000 ? "inline-block" : "none";

  // ===== //

  // Button Display
  upgradePickaxeButton.textContent = nextPickaxe
    ? `Buy ${nextPickaxe.name} — ${nextPickaxe.cost} XP`
    : "All pickaxes purchased";

  upgradeFarmVButton.textContent = `Buy Villager Farm — ${
    Math.floor(farms[0].cost)
  } XP`;

  upgradeFarmSButton.textContent = `Buy Spawner Farm — ${
    Math.floor(farms[1].cost)
  } XP`;

  // ===== //
}

// Automatically earn XP from farms every second
const TICKS_PER_SECOND = 10;
setInterval(() => {
  const farmV = farms[0];
  const farmS = farms[1];

  const gained =
    (farmV.xpPerSecond * farmV.quantity + farmS.xpPerSecond * farmS.quantity) /
    TICKS_PER_SECOND;
  xp += gained;
  totalXp += gained;

  updateDisplay();
}, 1000 / TICKS_PER_SECOND);
// ===== //

// Initial display update
updateDisplay();

// Set initial cursor for the mine button
mineButton.style.cursor = `url("${
  pickaxes[currentPickaxeIndex].cursorUrl
}") 16 16, pointer`;

// Earn XP and update display on button click
mineButton.addEventListener("click", () => {
  const currentPickaxe = pickaxes[currentPickaxeIndex]!;
  xp += currentPickaxe.xpPerClick;
  totalXp += currentPickaxe.xpPerClick;
  updateDisplay();
});

// Upgrade pickaxe button click event
upgradePickaxeButton.addEventListener("click", () => {
  const nextPickaxe = pickaxes[currentPickaxeIndex + 1];

  if (!nextPickaxe || xp < nextPickaxe.cost) {
    return;
  }

  xp -= nextPickaxe.cost;
  currentPickaxeIndex += 1;

  updateDisplay();
});

// Upgrade farm buttons click events
upgradeFarmVButton.addEventListener("click", () => {
  const farmV = farms[0];
  if (xp < farmV.cost) {
    return;
  }

  const currentFarmVCost = farmV.cost;
  xp -= farmV.cost;
  farmV.quantity += 1;
  farmV.cost += currentFarmVCost * 0.5; // Increase cost by 50% for next purchase
  addFarmImage(farmVContainer, farmV.imageUrl, farmV.name);
  updateDisplay();
});

upgradeFarmSButton.addEventListener("click", () => {
  const farmS = farms[1];
  if (xp < farmS.cost) {
    return;
  }

  const currentFarmSCost = farmS.cost;
  xp -= farmS.cost;
  farmS.cost += currentFarmSCost * 0.8; // Increase cost by 80% for next purchase
  farmS.quantity += 1;
  addFarmImage(farmSContainer, farmS.imageUrl, farmS.name);
  updateDisplay();
});

// ===== //

app.append(
  heading,
  pickaxeImage,
  mineButton,
  xpDisplay,
  clickPowerDisplay,
  farmVContainer,
  farmSContainer,
  upgradePickaxeButton,
  upgradeFarmVButton,
  upgradeFarmSButton,
);

updateDisplay();
