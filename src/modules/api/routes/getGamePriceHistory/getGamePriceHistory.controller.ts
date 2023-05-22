import { ResponseBuilder } from '@api/responses/response.builder'
import { HttpController } from '@localtypes/http/http.controller.type'
import {
  HttpMethod,
  HttpRequest,
  HttpResponse
} from '@localtypes/http/http.type'
import { injectable } from 'tsyringe'

import { GetGamePriceHistoryRepository } from './repositories/getGamePriceHistory.repository'
import { IsGameExistRepository } from './repositories/isGameExist.repository'

@injectable()
export class GetGamePriceHistoryController implements HttpController {
  public method = HttpMethod.GET
  public url = '/games/:id/price/history'

  constructor(
    private readonly getGamePriceHistoryRepo: GetGamePriceHistoryRepository,
    private readonly isGameExistRepo: IsGameExistRepository
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse> {
    const gameID = request.params.id as string
    const query = request.query

    const isGameExist = await this.isGameExistRepo.get(gameID)
    if (!isGameExist) return ResponseBuilder.notFound('game not found')

    const priceHistory = await this.getGamePriceHistoryRepo.get(gameID, query)

    return ResponseBuilder.ok(priceHistory)
  }
}
