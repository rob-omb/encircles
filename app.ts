export class StoreFront {
  items: Item[];

  constructor(items: Item[]) {
    this.items = items;
  }

  updateQuality(): void {
    for (let item of this.items) {
      if (item.type === "aged" || item.type === "special") {
        this.updateSpecialItemQuality(item);
      } else {
        this.updateCommonItemQuality(item);
      }

      if (item.type !== "legendary") {
        item.sellDays--;
      }

      if (item.sellDays < 0) {
        this.updateExpiredItemQuality(item);
      }
    }
  }

  updateCommonItemQuality(item: Item): void {
    if (item.quality > 0 && item.name !== "Golden Scimitar") {
      if (item.name === "Conjured Mana Cake") {
        item.quality -= 2;
      } else {
        item.quality--;
      }
    }
  }

  updateSpecialItemQuality(item: Item): void {
    if (item.quality < 50) {
      item.quality++;
      if (item.type === "special") {
        if (item.sellDays < 11) {
          item.quality++;
        }

        if (item.sellDays < 6) {
          item.quality++;
        }
      }
    }
  }

  updateExpiredItemQuality(item: Item): void {
    switch (item.type) {
      case "aged":
        if (item.quality < 50) {
          item.quality++;
        }
        break;

      case "special":
        item.quality = 0;
        break;

      case "legendary":
        break;

      case "conjured":
        item.quality -= 2;
        break;

      default:
        item.quality--;
        break;
    }
  }
}

export class Item {
  name: string;
  type: string;
  quality: number;
  sellDays: number;

  constructor(name: string, type: string, quality: number, sellDays: number) {
    this.name = name;
    this.type = type;
    this.quality = quality;
    this.sellDays = sellDays;
  }

  toString(): string {
    return `${this.name}, ${this.type}, ${this.quality}, ${this.sellDays}`;
  }
}
