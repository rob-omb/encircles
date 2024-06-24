# StoreFront Requirements Specification

Hi and welcome to team!

As you know, we are a small store with a prime location. We buy and sell only the finest goods. Unfortunately, our goods are constantly degrading in `Quality` as they approach their sell by date.

We have a system in place that updates our inventory for us.

Your task is to add the new feature to our system so that we can begin selling a new category of items.

## First an introduction to our system:

- All `items` have a `SellIn` value which denotes the number of days we have to sell the `items`.
- All `items` have a `Quality` value which denotes how valuable the item is.
- At the end of each day our system adjusts both values for every item.
- Once the sell by date has passed, `Quality` ~~degrades~~ _changes_ twice as fast.
- The `Quality` of an item is never negative.

Pretty simple, right? Well this is where it gets interesting:

- Some items `Quality` increases instead of decreasing.
- An items `Quality` is never increased to be more than `50`.
- **"Aged Brie"** increases in `Quality` the older it gets.
- **"Backstage passes"**, increase in `Quality` as its `SellIn` value approaches.
  - The `Quality` increases by `2` when there are `10` days or less and by `3` when there are `5` days or less.
    - The `Quality` drops to `0` after the concert.
- **"Golden Scimitar"**, being a legendary item, has a `Quality` of `80`, never has to be sold nor does it decrease in `Quality`.

## Change Request

We have recently signed a supplier of conjured items. This requires an update to our system:

- **"Conjured"** items degrade in `Quality` twice as fast as normal items.

Feel free to make any changes to the `UpdateQuality` method and add any new code as long as everything still works correctly.
