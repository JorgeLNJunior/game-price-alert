import { PINO_LOGGER } from '@dependencies/dependency.tokens'
import type { ApplicationCronJob } from '@localtypes/cron.type'
import { ApplicationLogger } from '@localtypes/logger.type'
import { GameQueue } from '@queue/game.queue'
import { inject, injectable } from 'tsyringe'

import { FindGameScraperDataRepository } from './repositories/findGameScraperData.repository'

@injectable()
export class GameScrapingCronJob implements ApplicationCronJob {
  public cronTime = '0 0 * * *' // At 00:00

  /**
   * Handles the game scraping cron job.
   * @param findGameScraperDataRepository - A game FindGameScraperDataRepository instance.
   * @param gameQueue - A game queue instance.
   * @param logger - An application logger.
   */
  constructor (
    private readonly findGameScraperDataRepository: FindGameScraperDataRepository,
    private readonly gameQueue: GameQueue,
    @inject(PINO_LOGGER) private readonly logger: ApplicationLogger
  ) {}

  public async jobFunction (): Promise<void> {
    this.logger.info('[GameScrapingCronJob] running game scraping job')

    const games = await this.findGameScraperDataRepository.find()

    const promises = games.map(async (game) => {
      await this.gameQueue.add({
        gameId: game.id,
        steamUrl: game.steam_url,
        nuuvemUrl: game.nuuvem_url
      })
    })

    const results = await Promise.allSettled(promises)
    results.forEach((result) => {
      if (result.status === 'rejected') {
        this.logger.error(
          result.reason,
          '[GameScrapingCronJob] failed to add a game to the queue'
        )
      }
    })

    this.logger.info('[GameScrapingCronJob] game scraping job is finished')
  }
}
