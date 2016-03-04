'use strict'

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

class MultiplePromisesArray {
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

class MultiplePromisesArguments {
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

  @waitFor('firstPromise', 'secondPromise')
  sayMessage () {
    return this.message
  }
}

const single = new SinglePromise('Hello, World!')
const multipleArray = new MultiplePromisesArray(['Hello, ', 'World!'])
const multipleArgs = new MultiplePromisesArguments(['Hello, ', 'World!'])

single.sayMessage().then(function (message) {
  if (message !== 'Hello, World!') {
    console.log(`Single promise, message incorrect: ${message}`)
    process.exit(1)
  }
})

multipleArray.sayMessage().then(function (message) {
  if (message !== 'Hello, World!') {
    console.log(`Multiple promises with array, message incorrect: ${message}`)
    process.exit(1)
  }
})

multipleArgs.sayMessage().then(function (message) {
  if (message !== 'Hello, World!') {
    console.log(`Multiple promises with arguments, message incorrect: ${message}`)
    process.exit(1)
  }
})
