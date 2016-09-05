'use strict'

const http = require('http')
const application = require('./application')

http.createServer(application).listen(8080)
