'use strict'

const self = module.exports
const repository = require('../../../repository')

self.getPath = function getPath (request, response) {
  const relativePath = request.path

  repository.isDirectory(relativePath)
    .then(isDirectory => isDirectory ? repository.getDirectory(relativePath) : repository.getFile(relativePath))
    .then(data => response.send(data))
}
