'use strict'

const self = module.exports
const fs = require('fs')
const Promise = require('bluebird')
const os = require('os')
const path = require('path')

const stat = Promise.promisify(fs.stat)
const readdir = Promise.promisify(fs.readdir)
const readFile = Promise.promisify(fs.readFile)

const Link = require('./data-model/Link')
const TypeEnum = require('./data-model/TypeEnum')
const Element = require('./data-model/Element')

// Hard coded
const basePath = os.homedir()

self.isDirectory = function isDirectory (relativePath) {
  return self.getStat(relativePath)
    .then(stat => Promise.resolve(stat.isDirectory()))
}

self.getFile = function getFile (relativePath) {
  return readFile(basePath + relativePath)
}

self.getDirectory = function getDirectory (relativePath) {
  return Promise.join(
    self.getMetaData(relativePath),
    self.getChildrenMetaData(relativePath),
    (self, children) => Promise.resolve({self, children})
  )
}

self.getMetaData = function getMetaData (relativePath) {
  return stat(basePath + relativePath).then(stat => {
    const link = buildLink(relativePath)
    const name = getName(relativePath)
    return new Element().setLink(link).setName(name).setType(stat.isDirectory() ? TypeEnum.DIRECTORY : TypeEnum.FILE).build()
  })
}

self.getChildrenMetaData = function getChildrenMetaData (relativePath) {
  return readdir(basePath + relativePath)
    .then(files => files.map(file => path.join(relativePath, file)))
    .then(paths => Promise.map(paths, path => self.getMetaData(path)))
}

self.getStat = function (relativePath) {
  return stat(basePath + relativePath)
}

function buildLink (path) {
  return new Link().setSelf(path).setParent(isBase(path) ? null : getParentLink(path))
}

function getName (relativePath) {
  return isBase(relativePath) ? 'User' : path.basename(relativePath)
}

function getParentLink (path) {
  const lastIndex = path.lastIndexOf('/')

  return lastIndex === 0 ? '/' : path.slice(0, path.lastIndexOf('/'))
}

function isBase (path) {
  return path === '/'
}
