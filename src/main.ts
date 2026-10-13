// Vite turns this import into a production-safe URL. Keep it as a file so
// even this tiny example demonstrates a separately deployed asset.
// @deno-types="./asset-url.d.ts"
import tileUrl from "./assets/grass-block.png?no-inline";

const app = document.querySelector<HTMLElement>("#app")!;

const heading = document.createElement("h1");
heading.textContent = "Minecraft XP Clicker";

// Player XP
let xp = 0;

const xpDisplay = document.createElement("p");
xpDisplay.textContent = `XP: ${xp}`;

// Clickable button
const mineButton = document.createElement("button");
mineButton.type = "button";
mineButton.setAttribute("aria-label", "Mine grass block for XP");

const image = document.createElement("img");
image.src = tileUrl;
image.alt = "Grass block";
image.width = 180;
image.height = 180;

mineButton.append(image);

// Earn XP and update display on button click
mineButton.addEventListener("click", () => {
  xp += 1;
  xpDisplay.textContent = `XP: ${xp}`;
});

app.append(heading, mineButton, xpDisplay);
