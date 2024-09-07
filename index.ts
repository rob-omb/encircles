import { productType } from "./constants";
import { Item, StoreFront, LegendaryItem } from "./app";

const { normal, agedBrie, conjured, legendary, backstagePass } = productType;

// Run the StoreFront for a number of days
/**
 * TODO: finish refactoring so that legendary items have a preset quality that can't be altered
 */
const items: Item[] = [
  new Item("+5 Dexterity Vest", normal, 20, 10),
  new Item("Aged Brie", agedBrie, 0, 2),
  new Item("Elixir of the Mongoose", normal, 7, 5),
  // new Item("Golden Scimitar", legendary),
  new Item("Golden Scimitar", legendary, 80, -1),
  new Item("VIP Pass: Concert A-123-F", backstagePass, 20, 15),
  new Item("VIP Pass: Concert A-123-F", backstagePass, 20, 10),
  new Item("VIP Pass: Concert A-123-F", backstagePass, 20, 5),
  new Item("Conjured Mana Cake", conjured, 6, 3),
  new Item("Conjured Mana Cake", conjured, 50, 3),
];
const days: number = 20;

for (let day: number = 0; day < days; day++) {
  console.log(`-------- day ${day} --------`);
  console.log("name, type, quality, sellDays");
  for (const item of items) {
    console.log(item.toString());
  }
  console.log("");

  const storeFront: StoreFront = new StoreFront(items);
  storeFront.updateQuality();
}
