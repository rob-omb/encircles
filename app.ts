import { productType } from "./constants";

export class StoreFront {
  items: Item[];

  constructor(items: Item[]) {
    this.items = items;
  }

  updateQuality(): void {
    // minus 1 if quality > 0
    // minus sellDays by 1
    // minus 1 again if sellDays <= 0 && quality > 0

    // minus sellIn days by 1
    // if sellIn days < 0 ? quality -2 : quality -1
    // Math.max()
    for (let item of this.items) {
      this.updateSellDays(item);

      switch (item.type) {
        case productType.legendary:
          break;

        case productType.agedBrie:
          this.updateAgedBrieItemQuality(item);
          break;

        case productType.backstagePass:
          this.updateBackstagePassItemQuality(item);
          break;

        case productType.conjured:
          this.updateConjuredItemQuality(item);
          break;

        default:
          this.updateNormalItemQuality(item);
          break;
      }
    }
  }

  updateSellDays(item: Item): void {
    if (item.type !== productType.legendary) {
      item.sellDays--;
    }
  }

  updateNormalItemQuality(item: Item): void {
    if (item.sellDays < 0) {
      item.quality -= 2;
    } else if (item.quality > 0) {
      item.quality--;
    }

    item.quality = Math.max(item.quality, 0);
  }

  updateConjuredItemQuality(item: Item): void {
    if (item.sellDays < 0) {
      item.quality -= 4;
    } else if (item.quality > 0) {
      item.quality -= 2;
    }

    item.quality = Math.max(item.quality, 0);
  }

  updateBackstagePassItemQuality(item: Item): void {
    if (item.sellDays <= 0) {
      item.quality = 0;
    } else if (item.sellDays < 6) {
      item.quality += 3;
    } else if (item.sellDays < 11) {
      item.quality += 2;
    } else {
      item.quality++;
    }

    item.quality = Math.min(item.quality, 50);
  }

  updateAgedBrieItemQuality(item: Item): void {
    if (item.sellDays < 0) {
      item.quality += 2;
    } else {
      item.quality++;
    }

    item.quality = Math.min(item.quality, 50);
  }
}

export class Item {
  name: string;
  type: string;
  quality: number;
  sellDays: number;

  constructor(name: string, type: string, quality: number, sellDays: number) {
    const isLegendaryItem = type === productType.legendary;

    this.name = name;
    this.type = type;
    this.quality = isLegendaryItem ? 80 : quality;
    this.sellDays = isLegendaryItem ? 0 : sellDays;
  }

  toString(): string {
    return `${this.name}, ${this.type}, ${this.quality}, ${this.sellDays}`;
  }
}

export class LegendaryItem {
  name: string;
  type: string;
  quality: number;
  sellDays: number;

  constructor(name: string) {
    (this.name = name), (this.type = productType.legendary), (this.quality = 80), (this.sellDays = 0);
  }

  toString(): string {
    return `${this.name}, ${this.type}, ${this.quality}, ${this.sellDays}`;
  }
}
