import { AuthService } from '@api/internal/auth.service'
import ConfigService from '@config/config.service'
import { PinoLogger } from '@infra/pino.logger'
import { GameBuilder } from '@testing/builders/game.builder'
import { HttpRequestBuilder } from '@testing/builders/http/http.request.builder'
import { container } from 'tsyringe'

import { IsGameExistRepository } from '../getGamePriceHistory/repositories/isGameExist.repository'
import { UpdateGameRepository } from './repositories/updateGame.repository'
import { UpdateGameController } from './updateGame.controller'
import { UpdateGameValidator } from './validator/updateGame.validator'

describe('UpdateGameController', () => {
  let controller: UpdateGameController
  let validator: UpdateGameValidator
  let authService: AuthService
  let isGameExistRepo: IsGameExistRepository
  let updateGameRepo: UpdateGameRepository

  beforeEach(() => {
    const logger = new PinoLogger()
    const config = new ConfigService(logger)

    validator = new UpdateGameValidator()
    authService = new AuthService(config)
    isGameExistRepo = container.resolve(IsGameExistRepository)
    updateGameRepo = container.resolve(UpdateGameRepository)

    controller = new UpdateGameController(
      validator, authService, isGameExistRepo, updateGameRepo, logger
    )
  })

  it('should return a OK response if it succeeds', async () => {
    const game = new GameBuilder().build()

    jest.spyOn(isGameExistRepo, 'get').mockResolvedValueOnce(true)
    jest.spyOn(updateGameRepo, 'update').mockResolvedValueOnce(game)

    const token = await authService.getJwtToken()
    const request = new HttpRequestBuilder()
      .withHeaders({ authorization: `Bearer ${token}` })
      .withParams({ id: game.id })
      .withBody(game)
      .build()
    const response = await controller.handle(request)

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(game)
  })

  it('should return a BAD_REQUEST response if validation fails', async () => {
    const token = await authService.getJwtToken()
    const request = new HttpRequestBuilder()
      .withHeaders({ authorization: `Bearer ${token}` })
      .withBody({ title: null })
      .build()
    const response = await controller.handle(request)

    expect(response.statusCode).toBe(400)
  })

  it('should return UNAUTHORIZED if it did not receive an auth token', async () => {
    const request = new HttpRequestBuilder().build()
    const response = await controller.handle(request)

    expect(response.statusCode).toBe(401)
  })

  it('should return UNAUTHORIZED if it received an invalid auth token', async () => {
    jest.spyOn(authService, 'verifyToken').mockResolvedValueOnce({
      isValid: false,
      error: 'invalid token'
    })

    const request = new HttpRequestBuilder().withHeaders({
      authorization: 'Bearer invalid.token'
    }).build()
    const response = await controller.handle(request)

    expect(response.statusCode).toBe(401)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((response.body as any).message).toBe('invalid token')
  })

  it('should return a INTERNAL_ERROR response if something throw', async () => {
    jest.spyOn(authService, 'verifyToken').mockRejectedValueOnce(new Error())

    const token = await authService.getJwtToken()
    const request = new HttpRequestBuilder().withHeaders({
      authorization: `Bearer ${token}`
    }).build()
    const response = await controller.handle(request)

    expect(response.statusCode).toBe(500)
  })
})
