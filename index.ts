import { Item, StoreFront } from "./app";

// Run the StoreFront for a number of days
const items: Item[] = [
  new Item("+5 Dexterity Vest", "common", 20, 10),
  new Item("Aged Brie", "aged", 0, 2),
  new Item("Elixir of the Mongoose", "common", 7, 5),
  new Item("Golden Scimitar", "legendary", 80, 0),
  new Item("Golden Scimitar", "legendary", 80, -1),
  new Item("VIP Pass: Concert A-123-F", "special", 20, 15),
  new Item("VIP Pass: Concert A-123-F", "special", 20, 10),
  new Item("VIP Pass: Concert A-123-F", "special", 20, 5),
  new Item("Conjured Mana Cake", "conjured", 6, 3),
  new Item("Conjured Mana Cake", "conjured", 50, 3),
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
