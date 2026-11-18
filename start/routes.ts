/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'

router.get('/', () => {
  return { hello: 'world' }
})

router.get('/health', async () => {
  return { status: 'ok' }
})

router.get('/health/live', [controllers.HealthChecks, 'live'])
router.get('/health/ready', [controllers.HealthChecks, 'ready'])

router
  .group(() => {
    router
      .group(() => {
        router.post('signup', [controllers.NewAccount, 'store'])
        router.post('login', [controllers.AccessTokens, 'store'])
      })
      .prefix('auth')
      .as('auth')

    router
      .group(() => {
        router.get('profile', [controllers.Profile, 'show'])
        router.post('logout', [controllers.AccessTokens, 'destroy'])
      })
      .prefix('account')
      .as('profile')
      .use(middleware.auth())

    router
      .group(() => {
        router.resource('categories', controllers.Categories).apiOnly()
        router.resource('tasks', controllers.Tasks).apiOnly()
      })
      .use(middleware.auth())
  })
  .prefix('/api/v1')
