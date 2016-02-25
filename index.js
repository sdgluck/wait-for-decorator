'use strict'

/**
 * Decorate a class method such that its body should be invoked only
 * once the Promise(s) defined by `promiseName` on the instance has resolved.
 * @param {String|Array} promiseName name of promise(s) on the class instance
 */
module.exports = function waitFor (promiseName) {
  const promises = Array.isArray(promiseName)
    ? promiseName
    : [promiseName]
  return (target, prop, descriptor) => {
    const fn = descriptor.value
    delete descriptor.writable
    delete descriptor.value
    descriptor.get = function () {
      return function () {
        return Promise
          .all(promises.map((promiseName) => {
            if (!(this[promiseName] instanceof Promise)) {
              throw new Error(`Expecting this['${promiseName}'] to be a Promise`)
            }
            return this[promiseName]
          }))
          .then(() => {
            return fn.apply(this, Array.from(arguments))
          })
      }.bind(this)
    }
  }
}
