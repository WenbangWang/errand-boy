'use strict'

module.exports = class Link {
  setSelf (self) {
    this._self = self

    return this
  }

  setParent (parent) {
    this._parent = parent

    return this
  }

  build () {
    return {
      self: this._self,
      parent: this._parent
    }
  }
}
