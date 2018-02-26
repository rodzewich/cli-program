# cli-program

[![NPM Version](http://img.shields.io/npm/v/cli-program.svg?style=flat)](https://www.npmjs.org/package/cli-program)
[![NPM Downloads](https://img.shields.io/npm/dm/cli-program.svg?style=flat)](https://www.npmjs.org/package/cli-program)

The complete solution for node.js command-line interfaces.

## Installation

    $ npm install cli-program --save

## Option parsing

Options are defined with the `.option()` method, also serving as documentation for the options. The example below parses args and options from `process.argv`.

```ts
import {program} from "cli-program";
program
    .version("0.1.0")
    .option("-p, --peppers", "Add peppers")
    .option("-P, --pineapple", "Add pineapple")
    .option("-b, --bbq-sauce", "Add bbq sauce")
    .option("-c, --cheese [type]", "Add the specified type of cheese [marble]", "marble")
    .parse(function (args: any, opts: any) {
        console.log("you ordered a pizza with:");
        if (opts.peppers) {
            console.log("  - peppers");
        }
        if (opts.pineapple) {
            console.log("  - pineapple");
        }
        if (opts.bbqSauce) {
            console.log("  - bbq");
        }
        console.log("  - %s cheese", opts.cheese);
    });
```
