// pickaxes.ts

// @deno-types="./asset-url.d.ts"
import woodenPickaxeUrl from "./assets/wooden-pickaxe.png?no-inline";
import stonePickaxeUrl from "./assets/stone-pickaxe.png?no-inline";

import woodenCursorUrl from "./assets/wooden-pickaxe-cursor.png?no-inline";
import stoneCursorUrl from "./assets/stone-pickaxe-cursor.png?no-inline";

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
];
