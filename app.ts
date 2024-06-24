export class StoreFront {
  items: Item[];

  constructor(items: Item[]) {
    this.items = items;
  }

  updateQuality(): void {
    for (let item of this.items) {
      // not brie or backstage pass
      if (item.name !== "Aged Brie" && item.name !== "VIP Pass: Concert A-123-F") {
        // qual is more than 0
        if (item.quality > 0) {
          // anything other than gScim or CMC, degrade by 1
          if (item.name !== "Golden Scimitar" && item.name !== "Conjured Mana Cake") {
            item.quality--;
          }

          //"Conjured" items degrade in Quality twice as fast as normal items.
          if (item.name === "Conjured Mana Cake") {
            item.quality -= 2;
          }
        }
      } else {
        // is brie or backstage pass
        if (item.quality < 50) {
          // bump qual by 1 for brie and backstage pass
          // this is the first increment of 1
          item.quality++;
          if (item.name === "VIP Pass: Concert A-123-F") {
            // BSP: less than 10 days, bump qual by an additional 1
            if (item.sellDays < 11) {
              if (item.quality < 50) {
                item.quality++;
              }
            }
            // BSP: less than 5 days, bump qual by yet another 1 (including the +1 bump from above, total 3)
            if (item.sellDays < 6) {
              if (item.quality < 50) {
                item.quality++;
              }
            }
          }
        }
      }

      // g.scim doesn't degrade
      if (item.name !== "Golden Scimitar") {
        item.sellDays--;
      }

      // expired items
      if (item.sellDays < 0) {
        if (item.name !== "Aged Brie") {
          if (item.name !== "VIP Pass: Concert A-123-F") {
            if (item.quality > 0) {
              if (item.name !== "Golden Scimitar") {
                if (item.name === "Conjured Mana Cake") {
                  item.quality -= 2;
                } else {
                  item.quality--;
                }
              }
            }
          } else {
            item.quality = 0;
          }
        } else {
          if (item.quality < 50) {
            // this is the second increment of 1 for expired items
            item.quality++;
          }
        }
      }
    }
  }
}

export class Item {
  name: string;
  quality: number;
  sellDays: number;

  constructor(name: string, sellDays: number, quality: number) {
    this.name = name;
    this.quality = quality;
    this.sellDays = sellDays;
  }

  toString(): string {
    return `${this.name}, ${this.sellDays}, ${this.quality}`;
  }
}
