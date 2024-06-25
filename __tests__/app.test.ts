import { Item, StoreFront } from "../app";

function generateItems() {
  return [
    new Item("+5 Dexterity Vest", "common", 20, 10),
    new Item("Aged Brie", "aged", 0, 2),
    new Item("Elixir of the Mongoose", "common", 7, 5),
    new Item("Golden Scimitar", "legendary", 80, 0),
    new Item("Golden Scimitar", "legendary", 80, -1),
    new Item("VIP Pass: Concert A-123-F", "special", 20, 15),
    new Item("VIP Pass: Concert A-123-F", "special", 20, 10),
    new Item("VIP Pass: Concert A-123-F", "special", 20, 5),
    new Item("Conjured Mana Cake", "conjured", 50, 3),
    new Item("Conjured Mana Cake", "conjured", 50, -1),
    new Item("+5 Dexterity Vest", "common", 20, -1),
    new Item("Aged Brie", "aged", 48, -10),
    new Item("VIP Pass: Concert A-123-F", "special", 20, -1),
  ];
}

let storeFront: StoreFront;
beforeEach(() => (storeFront = new StoreFront(generateItems())));

describe("Item class", () => {
  const name = "Some product";
  const type = "common";
  const quality = 1;
  const sellDays = 3;

  const newItem = new Item(name, type, quality, sellDays);

  it("should create an item with the correct properties", () => {
    expect(newItem.name).toBe(name);
    expect(newItem.type).toBe(type);
    expect(newItem.quality).toBe(quality);
    expect(newItem.sellDays).toBe(sellDays);
  });

  it("should strigify the item", () => {
    const expected = "Some product, common, 1, 3";

    expect(newItem.toString()).toBe(expected);
  });
});

describe("updateQuality function", () => {
  it("should not degrade quality of 'legendary' items", () => {
    const goldenScimitar = storeFront.items[4];

    storeFront.updateQuality();
    storeFront.updateQuality();

    expect(goldenScimitar.quality).toBe(80);
  });

  it("should degrade quality by 1 for 'common' items", () => {
    const dexVest = storeFront.items[0];

    storeFront.updateQuality();
    storeFront.updateQuality();

    expect(dexVest.quality).toBe(18);
  });

  it("should degrade 'conjured' items twice as fast", () => {
    const conjuredManaCake = storeFront.items[8];

    storeFront.updateQuality();
    storeFront.updateQuality();

    expect(conjuredManaCake.quality).toBe(46);
  });

  it("should degrade 'expired' items twice as fast", () => {
    const expiredManaCake = storeFront.items[9];
    const expiredDexVest = storeFront.items[10];

    storeFront.updateQuality();
    storeFront.updateQuality();

    // Conjured Mana Cake loses 4 per day
    expect(expiredManaCake.quality).toBe(42);

    // Dexterity Vest/regular item loses 2 per day
    expect(expiredDexVest.quality).toBe(16);
  });

  it("should increase quality of 'aged' items each day", () => {
    // days start at 2, quality is 0
    const agedBrie = storeFront.items[1];

    // minus 1 day + 1 quality = 1
    storeFront.updateQuality();

    // days are 1. minus 1 day, + 1 quality = 2
    storeFront.updateQuality();

    // days are 0, minus 1 day, + 2 quality = 4
    storeFront.updateQuality();

    // days are -1, minus 1 day, + 2 quality = 6
    storeFront.updateQuality();

    expect(agedBrie.quality).toBe(6);
  });

  it("should never increase quality beyond 50", () => {
    const reallyOldBrie = storeFront.items[11];

    storeFront.updateQuality();
    storeFront.updateQuality();

    expect(reallyOldBrie.quality).toBe(50);
  });

  it("should increase quality of 'special' items by 1 when days are greater than 10", () => {
    const regularBackStagePass = storeFront.items[5];

    storeFront.updateQuality();
    storeFront.updateQuality();

    expect(regularBackStagePass.quality).toBe(22);
  });

  it("should increase quality of 'special' items by 2 when days are less than 10 and greater than 5", () => {
    const tenDayBackStagePass = storeFront.items[6];

    storeFront.updateQuality();
    storeFront.updateQuality();

    expect(tenDayBackStagePass.quality).toBe(24);
  });

  it("should increase quality of 'special' items by 3 when days are less than 5 and greater than 0", () => {
    const fiveDayBackStagePass = storeFront.items[7];

    storeFront.updateQuality();
    storeFront.updateQuality();

    expect(fiveDayBackStagePass.quality).toBe(26);
  });

  it("should set quality to 0 for 'special' items when expired", () => {
    const expiredBackStagePass = storeFront.items[12];

    storeFront.updateQuality();

    expect(expiredBackStagePass.quality).toBe(0);
  });
});
