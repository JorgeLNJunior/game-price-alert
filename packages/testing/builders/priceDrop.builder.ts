/* eslint-disable @typescript-eslint/prefer-readonly */
import { GamePriceDrop, Store } from '@packages/types'
import { randomUUID } from 'crypto'

export class GamePriceDropBuilder {
  private id = randomUUID()
  private game_id: string = randomUUID()
  private discount_price = 50.99
  private old_price = 50.99
  private store = Store.STEAM
  private date = '2022-10-21'

  withGame (gameId: string): GamePriceDropBuilder {
    this.game_id = gameId
    return this
  }

  withDiscountPrice (price: number): GamePriceDropBuilder {
    this.discount_price = price
    return this
  }

  withOldPrice (price: number): GamePriceDropBuilder {
    this.old_price = price
    return this
  }

  withStore (store: Store): GamePriceDropBuilder {
    this.store = store
    return this
  }

  build (): GamePriceDrop {
    return {
      id: this.id,
      game_id: this.game_id,
      discount_price: this.discount_price,
      old_price: this.old_price,
      store: this.store,
      date: this.date
    }
  }
}
