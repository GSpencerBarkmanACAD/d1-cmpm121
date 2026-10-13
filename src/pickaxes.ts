// pickaxes.ts

// @deno-types="./asset-url.d.ts"
import woodenPickaxeUrl from "./assets/wooden-pickaxe.png?no-inline";
import stonePickaxeUrl from "./assets/stone-pickaxe.png?no-inline";
import ironPickaxeUrl from "./assets/iron-pickaxe.png?no-inline";
import goldenPickaxeUrl from "./assets/golden-pickaxe.png?no-inline";
import diamondPickaxeUrl from "./assets/diamond-pickaxe.png?no-inline";
import netheritePickaxeUrl from "./assets/netherite-pickaxe.png?no-inline";

import woodenCursorUrl from "./assets/wooden-pickaxe-cursor.png?no-inline";
import stoneCursorUrl from "./assets/stone-pickaxe-cursor.png?no-inline";
import ironCursorUrl from "./assets/iron-pickaxe-cursor.png?no-inline";
import goldenCursorUrl from "./assets/golden-pickaxe-cursor.png?no-inline";
import diamondCursorUrl from "./assets/diamond-pickaxe-cursor.png?no-inline";
import netheriteCursorUrl from "./assets/netherite-pickaxe-cursor.png?no-inline";

export interface Pickaxe {
  name: string;
  cost: number;
  xpPerClick: number;
  imageUrl: string;
  cursorUrl: string;
}

export const pickaxes: Pickaxe[] = [
  {
    name: "Wooden Pickaxe",
    cost: 0,
    xpPerClick: 1,
    imageUrl: woodenPickaxeUrl,
    cursorUrl: woodenCursorUrl,
  },
  {
    name: "Stone Pickaxe",
    cost: 25,
    xpPerClick: 2,
    imageUrl: stonePickaxeUrl,
    cursorUrl: stoneCursorUrl,
  },
  {
    name: "Iron Pickaxe",
    cost: 150,
    xpPerClick: 5,
    imageUrl: ironPickaxeUrl,
    cursorUrl: ironCursorUrl,
  },
  {
    name: "Gold Pickaxe",
    cost: 600,
    xpPerClick: 10,
    imageUrl: goldenPickaxeUrl,
    cursorUrl: goldenCursorUrl,
  },
  {
    name: "Diamond Pickaxe",
    cost: 2500,
    xpPerClick: 25,
    imageUrl: diamondPickaxeUrl,
    cursorUrl: diamondCursorUrl,
  },
  {
    name: "Netherite Pickaxe",
    cost: 10000,
    xpPerClick: 100,
    imageUrl: netheritePickaxeUrl,
    cursorUrl: netheriteCursorUrl,
  },
];
