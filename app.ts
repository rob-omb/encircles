export class StoreFront {
  items: Item[];

  constructor(items: Item[]) {
    this.items = items;
  }

  updateQuality(): void {
    for (let item of this.items) {
      switch (item.type) {
        case "legendary":
          break;

        case "aged":
          this.updateAgedItemQuality(item);
          break;

        case "special":
          this.updateSpecialItemQuality(item);
          break;

        case "conjured":
          this.updateConjuredItemQuality(item);
          break;

        default:
          this.updateCommonItemQuality(item);
          break;
      }

      this.updateSellDays(item);
    }
  }

  updateSellDays(item: Item): void {
    if (item.type !== "legendary") {
      item.sellDays--;
    }

    if (item.sellDays < 0) {
      this.updateExpiredItemQuality(item);
    }
  }

  updateCommonItemQuality(item: Item): void {
    if (item.quality > 0) {
      item.quality--;
    }
  }

  updateConjuredItemQuality(item: Item): void {
    if (item.quality > 0) {
      item.quality -= 2;
    }
  }

  updateSpecialItemQuality(item: Item): void {
    if (item.quality < 50) {
      item.quality++;

      if (item.sellDays < 11) {
        item.quality++;
      }

      if (item.sellDays < 6) {
        item.quality++;
      }
    }
  }

  updateAgedItemQuality(item: Item): void {
    if (item.quality < 50) {
      item.quality++;
    }
  }

  updateExpiredItemQuality(item: Item): void {
    switch (item.type) {
      case "legendary":
        break;

      case "aged":
        if (item.quality < 50) {
          item.quality++;
        }
        break;

      case "special":
        item.quality = 0;
        break;

      case "conjured":
        item.quality > 0 ? (item.quality -= 2) : (item.quality = 0);
        break;

      default:
        item.quality > 0 ? item.quality-- : (item.quality = 0);
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
