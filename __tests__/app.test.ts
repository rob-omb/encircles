import { Item, StoreFront } from "../app";

function generateItems() {
  return [
    new Item("+5 Dexterity Vest", 10, 20),
    new Item("Aged Brie", 2, 0),
    new Item("Elixir of the Mongoose", 5, 7),
    new Item("Golden Scimitar", 0, 80),
    new Item("Golden Scimitar", -1, 80),
    new Item("VIP Pass: Concert A-123-F", 15, 20),
    new Item("VIP Pass: Concert A-123-F", 10, 20),
    new Item("VIP Pass: Concert A-123-F", 5, 20),
    new Item("Conjured Mana Cake", 3, 50),
    new Item("Conjured Mana Cake", -1, 50),
    new Item("+5 Dexterity Vest", -1, 20),
    new Item("Aged Brie", -10, 48),
    new Item("VIP Pass: Concert A-123-F", -1, 20),
  ];
}

let storeFront: StoreFront;
beforeEach(() => (storeFront = new StoreFront(generateItems())));

describe("updateQuality function", () => {
  it("should not degrade quality of Golden Scimitar", () => {
    const goldenScimitar = storeFront.items[4];

    storeFront.updateQuality();
    storeFront.updateQuality();

    expect(goldenScimitar.quality).toBe(80);
  });

  it("should degrade quality by 1 for regular items", () => {
    const dexVest = storeFront.items[0];

    storeFront.updateQuality();
    storeFront.updateQuality();

    expect(dexVest.quality).toBe(18);
  });

  it("should degrade Conjured Mana Cake twice as fast", () => {
    const conjuredManaCake = storeFront.items[8];

    storeFront.updateQuality();
    storeFront.updateQuality();

    expect(conjuredManaCake.quality).toBe(46);
  });

  it("should degrade expired items twice as fast", () => {
    const expiredManaCake = storeFront.items[9];
    const expiredDexVest = storeFront.items[10];

    storeFront.updateQuality();
    storeFront.updateQuality();

    // Conjured Mana Cake loses 4 per day
    expect(expiredManaCake.quality).toBe(42);

    // Dexterity Vest/regular item loses 2 per day
    expect(expiredDexVest.quality).toBe(16);
  });

  it("should increase quality of Aged Brie each day", () => {
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

  it("should increase quality of Backstage passes by 1 when days are greater than 10", () => {
    const regularBackStagePass = storeFront.items[5];

    storeFront.updateQuality();
    storeFront.updateQuality();

    expect(regularBackStagePass.quality).toBe(22);
  });

  it("should increase quality of Backstage passes by 2 when days are less than 10 and greater than 5", () => {
    const tenDayBackStagePass = storeFront.items[6];

    storeFront.updateQuality();
    storeFront.updateQuality();

    expect(tenDayBackStagePass.quality).toBe(24);
  });

  it("should increase quality of Backstage passes by 3 when days are less than 5 and greater than 0", () => {
    const fiveDayBackStagePass = storeFront.items[7];

    storeFront.updateQuality();
    storeFront.updateQuality();

    expect(fiveDayBackStagePass.quality).toBe(26);
  });

  it("should set quality to 0 for Backstage passes when expired", () => {
    const expiredBackStagePass = storeFront.items[12];

    storeFront.updateQuality();

    expect(expiredBackStagePass.quality).toBe(0);
  });
});
