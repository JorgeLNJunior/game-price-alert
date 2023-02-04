import { HttpResponse } from '../interfaces/http.interface'

export class ResponseBuilder {
  /**
   * Build a HTTP 200 response.
   *
   * ```
   * return ResponseBuilder.ok(data)
   * ```
   *
   * @param {unknown} data The data to be returned.
   * @returns {HttpResponse} A `HttpResponse`.
   */
  static ok(data?: unknown): HttpResponse {
    return { statusCode: 200, body: data }
  }

  /**
   * Build a HTTP 201 response.
   *
   * ```
   * return ResponseBuilder.created(data)
   * ```
   *
   * @param {unknown} data The data to be returned.
   * @returns {HttpResponse} A `HttpResponse`.
   */
  static created(data?: unknown): HttpResponse {
    return { statusCode: 201, body: data }
  }

  /**
   * Build a HTTP 400 response.
   *
   * ```
   * return ResponseBuilder.badRequest(data)
   * ```
   *
   * @param {unknown} errors A list of errors to be returned.
   * @returns {HttpResponse} A `HttpResponse`.
   */
  static badRequest(errors?: unknown): HttpResponse {
    return {
      statusCode: 400,
      body: {
        error: 'Bad Request',
        messages: errors
      }
    }
  }

  /**
   * Build a HTTP 401 response.
   *
   * ```
   * return ResponseBuilder.ok(data)
   * ```
   *
   * @param {unknown} error An error to be returned.
   * @returns {HttpResponse} A `HttpResponse`.
   */
  static unauthorized(error?: unknown): HttpResponse {
    return {
      statusCode: 401,
      body: {
        error: 'Unauthorized',
        message: error
      }
    }
  }

  /**
   * Build a HTTP 403 response.
   *
   * ```
   * return ResponseBuilder.forbidden(data)
   * ```
   *
   * @param {unknown} error An error to be returned.
   * @returns {HttpResponse} A `HttpResponse`.
   */
  static forbidden(error?: unknown): HttpResponse {
    return {
      statusCode: 403,
      body: {
        error: 'Forbidden',
        message: error
      }
    }
  }

  /**
   * Build a HTTP 404 response.
   *
   * ```
   * return ResponseBuilder.notFound(data)
   * ```
   *
   * @param {unknown} error An error to be returned.
   * @returns {HttpResponse} A `HttpResponse`.
   */
  static notFound(error?: unknown): HttpResponse {
    return {
      statusCode: 404,
      body: {
        error: 'Not Found',
        message: error
      }
    }
  }

  /**
   * Build a HTTP 500 response.
   *
   * ```
   * return ResponseBuilder.internalError()
   * ```
   *
   * @returns {HttpResponse} A `HttpResponse`.
   */
  static internalError(): HttpResponse {
    return {
      statusCode: 500,
      body: {
        error: 'Internal Error',
        message: 'internal server error'
      }
    }
  }
}
