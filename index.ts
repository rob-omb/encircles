import { Item, StoreFront } from "./app";

// Run the StoreFront for a number of days
const items: Item[] = [
  new Item("+5 Dexterity Vest", 10, 20),
  new Item("Aged Brie", 2, 0),
  new Item("Elixir of the Mongoose", 5, 7),
  new Item("Golden Scimitar", 0, 80),
  new Item("Golden Scimitar", -1, 80),
  new Item("VIP Pass: Concert A-123-F", 15, 20),
  new Item("VIP Pass: Concert A-123-F", 10, 20),
  new Item("VIP Pass: Concert A-123-F", 5, 20),
  new Item("Conjured Mana Cake", 3, 6),
  new Item("Conjured Mana Cake", 3, 60),
];
const days: number = 20;

for (let day: number = 0; day < days; day++) {
  console.log(`-------- day ${day} --------`);
  console.log("name, sellIn, quality");
  for (const item of items) {
    console.log(item.toString());
  }
  console.log("");

  const storeFront: StoreFront = new StoreFront(items);
  storeFront.updateQuality();
}
