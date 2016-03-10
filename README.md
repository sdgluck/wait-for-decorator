# wait-for-decorator

> Decorate a class method to return and wait on a Promise on the class instance before executing

Made with ❤ at [@outlandish](http://www.twitter.com/outlandish)

<a href="http://badge.fury.io/js/wait-for-decorator"><img alt="npm version" src="https://badge.fury.io/js/wait-for-decorator.svg"></a>
<a href="https://travis-ci.org/sdgluck/wait-for-decorator"><img alt="CI build status" src="https://travis-ci.org/sdgluck/wait-for-decorator.svg"></a>
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)
    
## Install

    npm install wait-for-decorator --save

## Usage

Wait on a single Promise:

    @waitFor('promiseName')
    
Wait on multiple Promises (array):

    @waitFor(['promiseName1', 'promiseName2'])

Wait on multiple Promises (arguments):

    @waitFor('promiseName1', 'promiseName2')

## Requirements

- Node >=4.1.1
- Babel >=5
- `babel-plugin-transform-decorators-legacy` (Babel 6 only) ([npm](https://www.npmjs.com/package/babel-plugin-transform-decorators-legacy))

## @waitFor

If you have a class that performs some asynchronous operation during initialisation but don't want consumption of its methods to be hindered by forcing their invocation to happen _after_ initialisation is complete, you will do something like this:

    class Example {
      constructor () {
          this.promise = this.initialise()
      }
      initialise () {
          ...returns a Promise that resolves on init complete
      }
      someMethod () {
          // Ensure init is complete internally...
          return this.promise.then(() => {
              // ...and now actually do the 'someMethod' operation
          })
      }
      anotherMethod () {
          return this.promise.then(() => {
              // Do 'anotherMethod' operation
          })
      }
    }
    
Which gets ugly when you have lots of methods implementing this same behaviour. Instead, decorate the method using `wait-for-decorator`:

    @waitFor('promise')
    someMethod () {
        // Everything here will run after `this.promise` resolves
    }

    @waitFor('promise')
    anotherMethod () {
        // And everything here too!
    }

## Examples

__Wait for single Promise__

    class Say {
      constructor (message) {
        this.message = ''
        this.timeoutPromise = new Promise((resolve, reject) => {
          setTimeout(() => {
            this.message = message
            resolve()
          }, 50)
        })
      }

      @waitFor('timeoutPromise')
      sayMessage () {
        console.log(this.message)
      }
    }

    const inst = new Say('Hello, World!')
    inst.sayMessage() //=> 'Hello, World!'

__Wait for multiple Promises__

    class Say {
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
        console.log(this.message)
      }
    }

    const inst = new Say(['Hello, ', 'World!'])
    inst.sayMessage() //=> 'Hello, World!'

## Contributing

All pull requests and issues welcome!

If you're not sure how, check out Kent C. Dodds' [great video tutorials on egghead.io](https://egghead.io/lessons/javascript-identifying-how-to-contribute-to-an-open-source-project-on-github)!
