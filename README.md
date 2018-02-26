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

Short flags may be passed as a single arg, for example `-abc` is equivalent to `-a -b -c`. Multi-word options such as "--template-engine" are camel-cased, becoming `args.templateEngine` etc.

Note that multi-word options starting with `--no` prefix negate the boolean value of the following word. For example, `--no-sauce` sets the value of `args.sauce` to false.

```ts
import {program} from "cli-program";
program
    .version("0.1.0")
    .option("-p, --password <string>", "Password to connect", null, ["no", "without"])
    .parse(function (args: any, opts: any) {
        if (opts.password === false) {
            console.log("Without password!");
        } else {
            console.log("Password: %s", opts.password);
        }
    });
```

## Version option

Calling the `version` implicitly adds the `-V` and `--version` options to the command.
When either of these options is present, the command prints the version number and exits.

    $ ./examples/pizza -V
    0.0.1

If you want your program to respond to the `-v` option instead of the `-V` option, simply pass custom flags to the `version` method using the same syntax as the `option` method.

```ts
program
  .version('0.0.1', '-v, --version')
```

The version flags can be named anything, but the long option is required.