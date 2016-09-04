'use strict'

module.exports = class Element {
  constructor () {
    this._link = null
    this._name = null
    this._type = null
  }

  setLink (link) {
    this._link = link

    return this
  }

  setName (name) {
    this._name = name

    return this
  }

  setType (type) {
    this._type = type

    return this
  }

  build () {
    return {
      link: this._link.build(),
      name: this._name,
      type: this._type
    }
  }
}
