import { healthChecks } from '#start/health'
import type { HttpContext } from '@adonisjs/core/http'

export default class HealthChecksController {
  async live({ response }: HttpContext) {
    return response.ok({ status: 'ok' })
  }

  async ready({ response, logger }: HttpContext) {
    const report = await healthChecks.run()
    if (report.isHealthy) {
      return response.ok({ status: 'ok' })
    }

    logger.error({ report }, 'healthcheck falhou')
    return response.serviceUnavailable({ status: 'unhealthy' })
  }
}
