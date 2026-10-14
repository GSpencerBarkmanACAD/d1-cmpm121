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

const FarmVImage = document.createElement("img");
FarmVImage.src = farms[0].imageUrl;
FarmVImage.width = 72;
FarmVImage.height = 72;
FarmVImage.style.display = "none"; // Initially hidden

const FarmSImage = document.createElement("img");
FarmSImage.src = farms[1].imageUrl;
FarmSImage.width = 72;
FarmSImage.height = 72;
FarmSImage.style.display = "none"; // Initially hidden

function updateDisplay() {
  const currentPickaxe = pickaxes[currentPickaxeIndex]!;
  const nextPickaxe = pickaxes[currentPickaxeIndex + 1];
  const FarmV = farms[0];
  const FarmS = farms[1];

  xpDisplay.textContent = `XP: ${Math.floor(xp)} (Total XP: ${
    Math.floor(totalXp)
  })`;

  clickPowerDisplay.textContent =
    `${currentPickaxe.name} — XP per click: ${currentPickaxe.xpPerClick}`;

  pickaxeImage.src = currentPickaxe.imageUrl;
  pickaxeImage.alt = currentPickaxe.name;

  // Pickaxe cursor
  mineButton.style.cursor = `url("${currentPickaxe.cursorUrl}") 16 16, pointer`;

  // Enable Upgrade Pickaxe button only if there's a next pickaxe and the player has enough XP
  upgradePickaxeButton.disabled = !nextPickaxe || xp < nextPickaxe.cost;

  // Enable Upgrade Villager Farm button only if total XP is 150 or more
  upgradeFarmVButton.disabled = xp < FarmV.cost;

  // Show Upgrade Villager Farm button only if total XP is 150 or more
  upgradeFarmVButton.style.display = totalXp >= 150 ? "inline-block" : "none";

  // Show the Villager Farm image
  FarmVImage.style.display = FarmV.quantity > 0 ? "inline-block" : "none";

  // Enable Upgrade Spawner Farm button only if total XP is 3000 or more
  upgradeFarmSButton.disabled = xp < FarmS.cost;

  // Show Upgrade Spawner Farm button only if total XP is 3000 or more
  upgradeFarmSButton.style.display = totalXp >= 3000 ? "inline-block" : "none";

  // Show the Spawner Farm image
  FarmSImage.style.display = FarmS.quantity > 0 ? "inline-block" : "none";

  upgradePickaxeButton.textContent = nextPickaxe
    ? `Buy ${nextPickaxe.name} — ${nextPickaxe.cost} XP`
    : "All pickaxes purchased";

  upgradeFarmVButton.textContent = `Buy Villager Farm — ${
    Math.floor(farms[0].cost)
  } XP`;
  upgradeFarmSButton.textContent = `Buy Spawner Farm — ${
    Math.floor(farms[1].cost)
  } XP`;
}

// Automatically earn XP from farms every second
const TICKS_PER_SECOND = 10;
setInterval(() => {
  const FarmV = farms[0];
  const FarmS = farms[1];

  const gained =
    (FarmV.xpPerSecond * FarmV.quantity + FarmS.xpPerSecond * FarmS.quantity) /
    TICKS_PER_SECOND;
  xp += gained;
  totalXp += gained;

  updateDisplay();
}, 1000 / TICKS_PER_SECOND);

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

upgradePickaxeButton.addEventListener("click", () => {
  const nextPickaxe = pickaxes[currentPickaxeIndex + 1];

  if (!nextPickaxe || xp < nextPickaxe.cost) {
    return;
  }

  xp -= nextPickaxe.cost;
  currentPickaxeIndex += 1;

  updateDisplay();
});

upgradeFarmVButton.addEventListener("click", () => {
  const FarmV = farms[0];
  if (xp < FarmV.cost) {
    return;
  }

  const currentFarmVCost = FarmV.cost;
  xp -= FarmV.cost;
  FarmV.quantity += 1;
  FarmV.cost += currentFarmVCost * 0.5; // Increase cost by 50% for next purchase
  updateDisplay();
});

upgradeFarmSButton.addEventListener("click", () => {
  const FarmS = farms[1];
  if (xp < FarmS.cost) {
    return;
  }

  const currentFarmSCost = FarmS.cost;
  xp -= FarmS.cost;
  FarmS.cost += currentFarmSCost * 0.8; // Increase cost by 80% for next purchase
  FarmS.quantity += 1;
  updateDisplay();
});

app.append(
  heading,
  pickaxeImage,
  mineButton,
  xpDisplay,
  clickPowerDisplay,
  FarmVImage,
  FarmSImage,
  upgradePickaxeButton,
  upgradeFarmVButton,
  upgradeFarmSButton,
);

updateDisplay();
