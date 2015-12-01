# generator-sub [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> A Yeoman generator for writing cli apps inspired by 37signals sub

## Installation

First, install [Yeoman](http://yeoman.io) and generator-sub using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-sub
```

Then generate your new project:

```bash
yo sub
```

## Running the generated cli app locally

For example, suppose you generated a cli app called sub.

First, link the new package

```bash
npm link
```
Then, get the help

```bash
» sub help
A simple cli application. Broken into sub commands, invoked under sub:
    example  an example command.  Ex. sub example
    help    (also: -h or --help) print this help message.  Ex. sub help
```

And run the example sub command

```bash
» sub example
You ran the example command!
```

## Adding a new sub command

Say you wanted to add a new subcommand, random, which prints a random number between 0 and a provided argument when invoked.  First, generate a new sub command

```bash
yo sub:command
```

And verify that everything worked as anticipated

```bash
npm link
sub random
> You ran the random command!
```

Then, add your new logic inside the exported function inside lib/random.js

```javascript
module.exports = function(argv){
  console.log(Math.random()*(+argv._[1]));
}
```

And then test your new command locally

```bash
sub random 100
> 80.6944249663502
```

## TODO

1. Make the tests pass
1. Add `sub update` to update the command
1. Add auto-updating using npm
1. Add auto-updating using git

## Example

See a sample cli app generated using this generator [here](https://github.com/prekolna/dnd-roller).

## Getting To Know Yeoman

Yeoman has a heart of gold. He&#39;s a person with feelings and opinions, but he&#39;s very easy to work with. If you think he&#39;s too opinionated, he can be easily convinced. Feel free to [learn more about him](http://yeoman.io/).

## License

MIT © [Doug Wade](dougwade.io)


[npm-image]: https://badge.fury.io/js/generator-sub.svg
[npm-url]: https://npmjs.org/package/generator-sub
[travis-image]: https://travis-ci.org/prekolna/generator-sub.svg?branch=master
[travis-url]: https://travis-ci.org/prekolna/generator-sub
[daviddm-image]: https://david-dm.org/prekolna/generator-sub.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/prekolna/generator-sub
[coveralls-image]: https://coveralls.io/repos/prekolna/generator-sub/badge.svg
[coveralls-url]: https://coveralls.io/r/prekolna/generator-sub
