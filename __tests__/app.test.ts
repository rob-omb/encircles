import { Item, StoreFront } from "../app";

function generateItems(items: Item[]) {
  let newItems: Item[] = [];
  items?.forEach(({ name, type, quality, sellDays }) => newItems.push(new Item(name, type, quality, sellDays)));

  return newItems;
}

let storeFront: StoreFront;
beforeEach(() => (storeFront = new StoreFront(generateItems([]))));

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
    storeFront.items = generateItems([{ name: "Golden Scimitar", type: "legendary", quality: 80, sellDays: -1 }]);

    const goldenScimitar = storeFront.items[0];

    storeFront.updateQuality();
    storeFront.updateQuality();

    expect(goldenScimitar.quality).toBe(80);
  });

  it("should degrade quality by 1 for 'common' items", () => {
    storeFront.items = generateItems([{ name: "+5 Dexterity Vest", type: "common", quality: 20, sellDays: 10 }]);

    const dexVest = storeFront.items[0];

    console.log(dexVest);
    storeFront.updateQuality();
    storeFront.updateQuality();

    expect(dexVest.quality).toBe(18);
  });

  it("should degrade 'conjured' items twice as fast", () => {
    storeFront.items = generateItems([{ name: "Conjured Mana Cake", type: "conjured", quality: 50, sellDays: 3 }]);

    const conjuredManaCake = storeFront.items[0];

    storeFront.updateQuality();
    storeFront.updateQuality();

    expect(conjuredManaCake.quality).toBe(46);
  });

  it("should degrade 'expired' items twice as fast", () => {
    storeFront.items = generateItems([
      { name: "Conjured Mana Cake", type: "conjured", quality: 50, sellDays: -1 },
      { name: "+5 Dexterity Vest", type: "common", quality: 20, sellDays: -1 },
    ]);

    const expiredManaCake = storeFront.items[0];
    const expiredDexVest = storeFront.items[1];

    storeFront.updateQuality();
    storeFront.updateQuality();

    // Conjured Mana Cake loses 4 per day
    expect(expiredManaCake.quality).toBe(42);

    // Dexterity Vest/regular item loses 2 per day
    expect(expiredDexVest.quality).toBe(16);
  });

  it("should increase quality of 'aged' items each day", () => {
    storeFront.items = generateItems([{ name: "Aged Brie", type: "aged", quality: 0, sellDays: 2 }]);

    // days start at 2, quality is 0
    const agedBrie = storeFront.items[0];

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
    storeFront.items = generateItems([
      { name: "Aged Brie", type: "aged", quality: 48, sellDays: -10 },
      { name: "VIP Pass: Concert A-123-F", type: "special", quality: 50, sellDays: 15 },
    ]);

    const reallyOldBrie = storeFront.items[0];
    const highQualitySpecialItem = storeFront.items[1];

    storeFront.updateQuality();
    storeFront.updateQuality();

    expect(reallyOldBrie.quality).toBe(50);
    expect(highQualitySpecialItem.quality).toBe(50);
  });

  it("should not decrease quality beyond 0", () => {
    storeFront.items = generateItems([
      { name: "Elixir of the Mongoose", type: "common", quality: 1, sellDays: 1 },
      { name: "Conjured Mana Cake", type: "conjured", quality: 1, sellDays: 1 },
    ]);

    const lowQualityCommonItem = storeFront.items[0];
    const lowQualityConjuredItem = storeFront.items[1];

    storeFront.updateQuality();
    storeFront.updateQuality();

    expect(lowQualityCommonItem.quality).toBe(0);
    expect(lowQualityConjuredItem.quality).toBe(0);
  });

  it("should increase quality of 'special' items by 1 when days are greater than 10", () => {
    storeFront.items = generateItems([
      { name: "VIP Pass: Concert A-123-F", type: "special", quality: 20, sellDays: 15 },
    ]);

    const regularBackStagePass = storeFront.items[0];

    storeFront.updateQuality();
    storeFront.updateQuality();

    expect(regularBackStagePass.quality).toBe(22);
  });

  it("should increase quality of 'special' items by 2 when days are less than 10 and greater than 5", () => {
    storeFront.items = generateItems([
      { name: "VIP Pass: Concert A-123-F", type: "special", quality: 20, sellDays: 10 },
    ]);

    const tenDayBackStagePass = storeFront.items[0];

    storeFront.updateQuality();
    storeFront.updateQuality();

    expect(tenDayBackStagePass.quality).toBe(24);
  });

  it("should increase quality of 'special' items by 3 when days are less than 5 and greater than 0", () => {
    storeFront.items = generateItems([
      { name: "VIP Pass: Concert A-123-F", type: "special", quality: 20, sellDays: 5 },
    ]);

    const fiveDayBackStagePass = storeFront.items[0];

    storeFront.updateQuality();
    storeFront.updateQuality();

    expect(fiveDayBackStagePass.quality).toBe(26);
  });

  it("should set quality to 0 for 'special' items when expired", () => {
    storeFront.items = generateItems([
      { name: "VIP Pass: Concert A-123-F", type: "special", quality: 20, sellDays: -1 },
    ]);

    const expiredBackStagePass = storeFront.items[0];

    storeFront.updateQuality();

    expect(expiredBackStagePass.quality).toBe(0);
  });
});
