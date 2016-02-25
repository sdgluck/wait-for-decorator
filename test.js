'use strict'

let assert = require('assert')
let waitFor = require('./index.js')

class SinglePromise {
  constructor (message) {
    this.message = ''
    this.timeoutPromise = new Promise((resolve) => {
      setTimeout(() => {
        this.message = message
        resolve()
      })
    })
  }

  @waitFor('timeoutPromise')
  sayMessage () {
    return this.message
  }
}

class MultiplePromises {
  constructor (messages) {
    this.message = ''
    this.firstPromise = new Promise((resolve) => {
      setTimeout(() => {
        this.message += messages[0]
        resolve()
      }, 50)
    })
    this.secondPromise = new Promise((resolve) => {
      setTimeout(() => {
        this.message += messages[1]
        resolve()
      }, 100)
    })
  }

  @waitFor(['firstPromise', 'secondPromise'])
  sayMessage () {
    return this.message
  }
}

const single = new SinglePromise('Hello, World!')
const multiple = new MultiplePromises(['Hello, ', 'World!'])

single.sayMessage().then(function (message) {
  if (message !== 'Hello, World!') {
    console.log(`Single promise, message incorrect: ${message}`)
    process.exit(1)
  }
})

multiple.sayMessage().then(function (message) {
  if (message !== 'Hello, World!') {
    console.log(`Multiple promises, message incorrect: ${message}`)
    process.exit(1)
  }
})
