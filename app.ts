export class StoreFront {
  items: Item[];

  constructor(items: Item[]) {
    this.items = items;
  }

  updateQuality(): void {
    for (let item of this.items) {
      if (item.name !== "Aged Brie" && item.name !== "VIP Pass: Concert A-123-F") {
        if (item.quality > 0) {
          if (item.name !== "Golden Scimitar" && item.name !== "Conjured Mana Cake") {
            item.quality--;
          }

          //"Conjured" items degrade in Quality twice as fast as normal items.
          if (item.name === "Conjured Mana Cake") {
            console.log(item.quality);
            item.quality -= 2;
          }
        }
      } else {
        if (item.quality < 50) {
          item.quality++;
          if (item.name === "VIP Pass: Concert A-123-F") {
            if (item.sellIn < 11) {
              if (item.quality < 50) {
                item.quality++;
              }
            }
            if (item.sellIn < 6) {
              if (item.quality < 50) {
                item.quality++;
              }
            }
          }
        }
      }

      if (item.name !== "Golden Scimitar") {
        item.sellIn--;
      }

      if (item.sellIn < 0) {
        if (item.name !== "Aged Brie") {
          if (item.name !== "VIP Pass: Concert A-123-F") {
            if (item.quality > 0) {
              if (item.name !== "Golden Scimitar") {
                item.quality--;
              }
            }
          } else {
            item.quality = 0;
          }
        } else {
          if (item.quality < 50) {
            item.quality++;
          }
        }
      }
    }
  }
}

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name: string, sellIn: number, quality: number) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }

  toString(): string {
    return `${this.name}, ${this.sellIn}, ${this.quality}`;
  }
}
