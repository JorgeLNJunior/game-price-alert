import { DatabaseService } from '@database/database.service'
import { GamePrice } from '@localtypes/entities.type'
import { sql } from 'kysely'
import { injectable } from 'tsyringe'

@injectable()
export class GetLowestHistoricalPriceRepository {
  constructor(private databaseService: DatabaseService) {}

  async get(gameID: string): Promise<GamePrice | undefined> {
    const data = await sql
      .raw<GamePrice>(
        `SELECT * FROM game_price
          WHERE game_id = "${gameID}"
          AND steam_price = (SELECT MIN(steam_price) FROM game_price)
            OR nuuvem_price = (SELECT MIN(nuuvem_price) FROM game_price)
          LIMIT 1;
        `
      )
      .execute(this.databaseService.getClient())
    return data.rows.at(0)
  }
}
