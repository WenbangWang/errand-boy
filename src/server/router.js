'use strict'

exports = module.exports = function router (appFactory) {
  const router = appFactory.Router()
  const routes = require('./routes')

  mappingRoutesToRouter(routes, router, appFactory)

  return router
}

function mappingRoutesToRouter (routes, router, app) {
  Object.keys(routes).forEach(routeName => {
    router.use(`/${routeName}`, routes[routeName](app))
  })
}
