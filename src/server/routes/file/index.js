'use strict'

const handlers = require('./handlers')

module.exports = function fileRoute (appFactory) {
  const router = appFactory.Router()

  router.route('/:path*').get(handlers.getPath)
  router.route('/').get(handlers.getPath)

  return router
}
