# cli-program

The complete solution for node.js command-line interfaces.

[![NPM Version](http://img.shields.io/npm/v/cli-program.svg?style=flat)](https://www.npmjs.org/package/cli-program)
[![NPM Downloads](https://img.shields.io/npm/dm/cli-program.svg?style=flat)](https://www.npmjs.org/package/cli-program)

## Installation

```
$ npm install cli-program --save
```

## Content:

- [.name(name)](#namename)
- [.description(description)](#descriptiondescription)
- [.usage(usage)](#usageusage)
- [.options(flags)](#optionflags-description-defaultvalue-negativeprefixes-preparationfunction)
- [.version(version)](#versionversion)
- [.arguments(arguments)](#argumentsarguments)
- [.command(command)](#commandcommand)
  - [Command-specific .action(action)](#)
  - [Command-specific .description(description)](#)
  - [Command-specific .alias(alias)](#)
  - [Command-specific .option(flags)](#)
  - [Command-specific .usage(usage)](#)
- [.parse(action?)](#parseparse)
- [Automated --help](#automated---help)
- [Automated --version](#automated---version)

## .name(name)

Program name is declared with the `.name(name: string)` method, also serving as documentation for the program name. The program name can be declared anything or skipped. As default value program uses name of executable filename.

```js
require("cli-program")
    .name("My Awesome Program")
    .parse(function () {
        // bootstrap
    });
```

```
$ program --help
My Awesome Program

Usage:

  program
```

## .description(description)

Program description is declared with the `.description(description: string)` method, also serving as documentation for the program description. The program description can be declared anything or skipped.

```js
require("cli-program")
    .name("My Awesome Program")
    .description("Multi-line detailed description")
    .parse(function () {
        // bootstrap
    });
```

```
$ program --help
My Awesome Program

  Multi-line detailed description

Usage:

  program
```

## .usage(usage)

Usage format is declared with the `.usage(usage: string)` method, also serving as documentation for the usage format. The usage format can be declared anything or skipped. As default value program automatically generates usage by program declaration.

```js
require("cli-program")
    .usage("[options...]")
    .parse(function () {
        // bootstrap
    });
```

```
$ program --help
program

Usage:

  program [options...]
```

## .option(flags, description?, defaultValue?, negativePrefixes?, preparationFunction?)

Options are defined with the `.option(flags: string, description?: string, defaultValue?: any, negativePrefixes?: string[], preparationFunction?: (value: any) => any)` method, also serving as documentation for the options. The example below parses args and options from `process.argv`.

```js
require("cli-program")
    .version("0.1.0")
    .option("-p, --peppers", "Add peppers")
    .option("-P, --pineapple", "Add pineapple")
    .option("-b, --bbq-sauce", "Add bbq sauce")
    .option("-c, --cheese [type]", "Add the specified type of cheese [marble]", "marble")
    .parse(function (args, opts) {
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

```js
require("cli-program")
    .version("0.1.0")
    .option("-p, --password <string>", "Password to connect", null, ["no", "without"])
    .parse(function (args, opts) {
        if (opts.password === false) {
            console.log("Without password!");
        } else {
            console.log("Password: %s", opts.password);
        }
    });
```

## .version(version)

Calling the `version` implicitly adds the `-V` and `--version` options to the program.
When either of these options is present, the command prints the version number and exits.

```
$ ./examples/pizza -V
0.0.1
```

If you want your program to respond to the `-v` option instead of the `-V` option, simply pass custom flags to the `version` method using the same syntax as the `option` method:

```js
require("cli-program")
    .version("0.0.1", "-v, --version");
```

or with special description:

```js
require("cli-program")
    .version("0.0.1", "-v, --version", "Special description");
```

The version flags can be named anything.

## .arguments(arguments)

Arguments are declared with the `.arguments(args: string)` method. The example below parses args and options from `process.argv`.

```js
// declare optional argument
require("cli-program")
    .arguments("[optional]");
```

```js
// declare optional arguments
require("cli-program")
    .arguments("[spread...]");
```

```js
// declare required argument
require("cli-program")
    .arguments("<required>");
```

```js
// combination declare
require("cli-program")
    .arguments("<argument1> <argument2> [more...]");
```

The arguments can be named anything. Angled brackets (e.g. `<required>`) indicate required input. Square brackets (e.g. `[optional]`) indicate optional input.

```js
require("cli-program")
    .arguments("<arg1> [args...]")
    .parse(function (args) {
        console.log("args: %s", JSON.stringify(args));
    });
// $ node path/to/program value1 value2 value3
// args: {"arg1":"value1","args":["value2","value3"]}
```

```js
require("cli-program")
    .arguments("<arg1> [arg2]")
    .parse(function (args) {
        console.log("args: %s", JSON.stringify(args));
    });
// $ node path/to/program value1
// args: {"arg1":"value1","arg2":null}
// $ node path/to/program value1 value2
// args: {"arg1":"value1","arg2":"value2"}
```

## Command-specific options

You can attach options to a command.

```js
require("cli-program")
    .command("rm <dir>") // comand with required argument
    .option("-r, --recursive", "Remove recursively")
    .action(function (args, opts) {
        console.log("remove " + args.dir + (opts.recursive ? " recursively" : ""))
    })
    .parse()
```

A command's options are validated when the command is used. Any unknown options will be reported as an error.

## Git-style sub-commands

```js
var program = require("cli-program");
program
  .version("0.1.0")
  .command("install [name]", "Install one or more packages")
  .action(function (args, opts) {
    console.log("args: " + JSON.stringify(args));
    console.log("opts: " + JSON.stringify(opts));
  });
program
  .command("search [query]", "Search with optional query")
  .action(function (args, opts) {
    console.log("args: " + JSON.stringify(args));
    console.log("opts: " + JSON.stringify(opts));
  });
program
  .command("list", "List packages installed")
  .action(function (args, opts) {
    console.log("args: " + JSON.stringify(args));
    console.log("opts: " + JSON.stringify(opts));
  });
program.parse();
```

When `.command()` is invoked with a description argument, no `.action(callback)` should be called to handle sub-commands, otherwise there will be an error. This tells commander that you"re going to use separate executables for sub-commands, much like `git(1)` and other popular tools.
The commander will try to search the executables in the directory of the entry script (like `./examples/pm`) with the name `program-command`, like `pm-install`, `pm-search`.

Options can be passed with the call to `.command()`. Specifying `true` for `opts.noHelp` will remove the option from the generated help output. Specifying `true` for `opts.isDefault` will run the subcommand if no other subcommand is specified.

If the program is designed to be installed globally, make sure the executables have proper modes, like `755`.

## Automated --help

 The help information is auto-generated based on the information commander already knows about your program, so the following `--help` info is for free:

```
$ ./examples/pizza --help
pizza

Usage:

  pizza [options...]

Options:

  -h, --help                   Show help
  --no-color,
  --color [value=null]         Disable/enable output colors
  -V, --version                Show version.
  -p, --peppers                Add peppers
  -P, --pineapple              Add pineapple
  -b, --bbq-sauce              Add bbq sauce
  -c, --cheese [type="marble"] Add the specified type of cheese [marble]
```

## Automated --version

The version information is auto-generated based on the information declared via [.version(version)](#versionversion) method. This case shouldn't have any handlers and works automatically. But version should be declared for work.

```
$ ./examples/pizza -V
Version: 0.0.1
```

```
$ ./examples/pizza --version
Version: 0.0.1
```

## Examples

More demos can be found in the [examples](https://github.com/rodzewich/cli-program/tree/master/examples) directory.

## License

MIT License

Copyright (c) 2018 Oleg Rodzewich

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
