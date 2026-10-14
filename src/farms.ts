import villagerFarmUrl from "./assets/villager.png?no-inline";
import spawnerFarmUrl from "./assets/spawner.png?no-inline";

// import woodenPickaxeUrl from "./assets/wooden-pickaxe.png?no-inline";
// import stonePickaxeUrl from "./assets/stone-pickaxe.png?no-inline";
// import ironPickaxeUrl from "./assets/iron-pickaxe.png?no-inline";
// import goldenPickaxeUrl from "./assets/golden-pickaxe.png?no-inline";
// import diamondPickaxeUrl from "./assets/diamond-pickaxe.png?no-inline";
// import netheritePickaxeUrl from "./assets/netherite-pickaxe.png?no-inline";

export interface Farm {
  name: string;
  cost: number;
  xpPerSecond: number;
  imageUrl: string;
  quantity: number;
}

export const farms: Farm[] = [
  {
    name: "Villager Farm",
    cost: 150,
    xpPerSecond: 1,
    imageUrl: villagerFarmUrl,
    quantity: 0,
  },
  {
    name: "Spawner Farm",
    cost: 3000,
    xpPerSecond: 5,
    imageUrl: spawnerFarmUrl,
    quantity: 0,
  },
];
