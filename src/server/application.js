'use strict'

const applicationFactory = require('./application-factory')
const router = require('./router')
const logger = require('./middlewares/logger')

const app = applicationFactory.getApplication()
const baseRouter = router(applicationFactory)

app.use(logger)
app.use('/', baseRouter)

module.exports = app
