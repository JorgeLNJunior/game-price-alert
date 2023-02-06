import { fastify, FastifyInstance } from 'fastify'
import { singleton } from 'tsyringe'

import { Logger } from '../infra/logger'
import ConfigService from '../services/config.service'
import { adaptRoute } from './adapters/route.adapter'
import { BaseController } from './interfaces/baseController.interface'

@singleton()
export class Server {
  private fastify: FastifyInstance

  constructor(private config: ConfigService, private logger: Logger) {
    this.fastify = fastify()
  }

  /**
   * Start the server and listen at `PORT` env or `3000`.
   *
   * ```
   * await server.listen()
   * ```
   */
  public async listen(): Promise<void> {
    this.logger.info('[server] starting server')
    await this.registerPlugins()
    return this.fastify.listen(
      {
        host: this.config.getEnv<string>('HOST') || '0.0.0.0',
        port: this.config.getEnv<number>('PORT') || 3000
      },
      (error) => {
        if (error) this.logger.fatal(error, '[Server] server startup error')
        else this.logger.info('[Server] server started')
      }
    )
  }

  /**
   * Close the server and stop listen.
   *
   * ```
   * await server.close()
   * ```
   */
  public async close(): Promise<void> {
    this.logger.info('[Server] closing server')
    return this.fastify.close()
    this.logger.info('[Server] server closed')
  }

  /**
   * Get the fastify instance.
   *
   * ```
   * const fastify = server.getFastifyInstance()
   * ```
   *
   * @returns {FastifyInstance} A fastify instance.
   */
  public getFastifyInstance(): FastifyInstance {
    return this.fastify
  }

  /**
   * Register a list of controllers.
   *
   * ```
   * server.registerControllers(
   *    new CatController(),
   *    new DogController(),
   * )
   * ```
   *
   * @param {BaseController[]} controllers A list of `BaseController`.
   */
  public registerControllers(...controllers: BaseController[]): void {
    this.logger.info('[Server] registering controllers')
    controllers.forEach((controller) => {
      this.fastify.route({
        url: controller.url,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        method: controller.method as any,
        handler: adaptRoute(controller)
      })
    })
    this.logger.info('[Server] controllers registered')
  }

  /**
   * Register fastify plugins.
   *
   * ```
   * await server.registerPlugins()
   * ```
   */
  private async registerPlugins(): Promise<void> {
    this.logger.info('[Server] registering all plugins')
    await this.fastify.register(import('@fastify/compress'))
    await this.fastify.register(import('@fastify/cors'))
    await this.fastify.register(import('@fastify/helmet'))
    await this.fastify.register(import('@fastify/swagger'), {
      mode: 'static',
      specification: {
        path: __dirname + '/docs/swagger.yaml',
        baseDir: ''
      }
    })
    await this.fastify.register(import('@fastify/swagger-ui'), {
      routePrefix: '/docs'
    })
    this.logger.info('[Server] all plugins registered')
  }
}
