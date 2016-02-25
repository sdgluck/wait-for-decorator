# wait-for-decorator

> Decorate a class method to return and wait on a Promise on the class instance before executing

Made with ❤ at [@outlandish](http://www.twitter.com/outlandish)

<a href="http://badge.fury.io/js/wait-for-decorator"><img alt="npm version" src="https://badge.fury.io/js/wait-for-decorator.svg"></a>
<a href="https://travis-ci.org/sdgluck/wait-for-decorator"><img alt="CI build status" src="https://travis-ci.org/sdgluck/wait-for-decorator.svg"></a>
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## Install

    npm install wait-for-decorator --save

## Usage

`@waitFor(promiseName)`

__promiseName__ {String|Array<String>} name of promise or array of names of promises to wait on

## Requirements

- Node >=4.1.1
- `babel-plugin-transform-decorators-legacy` ([npm](https://www.npmjs.com/package/babel-plugin-transform-decorators-legacy))

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
        console.log(this.parts.join(''))
      }
    }

    const inst = new Say(['Hello, ', 'World!'])
    inst.sayMessage() //=> 'Hello, World!'

## Contributing

All pull requests and issues welcome!

If you're not sure how, check out Kent C. Dodds' [great video tutorials on egghead.io](https://egghead.io/lessons/javascript-identifying-how-to-contribute-to-an-open-source-project-on-github)!
