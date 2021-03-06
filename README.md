# CLI-PROGRAM

The complete and simple to configure solution for run applications from command-line interface. This solution supports all kind of elements in command line, etc commands, arguments and parameters.

[![NPM Version](http://img.shields.io/npm/v/cli-program.svg?style=flat)](https://www.npmjs.org/package/cli-program)
[![NPM Downloads](https://img.shields.io/npm/dm/cli-program.svg?style=flat)](https://www.npmjs.org/package/cli-program)

## INSTALLATION

For installing you need nodejs and npm in your system. If don't have it then you need to install nodejs and npm previously. 

```
$ npm install cli-program --save
```

## CONTENT

- [Declaring program name](#declaring-program-name-method-namename)
- [Declaring program description](#declaring-program-description-method-descriptiondescription)
- [Declaring usage block](#declaring-usage-block-method-usageusage)
- [Declaring common options](#declaring-common-options-method-optionflags-description-defaultvalue-negativeprefixes-preparationfunction)
  - [Option flags](#option-flags)
  - [Option description](#option-description)
  - [Option default value](#option-default-value)
  - [Option negative prefixes](#option-negative-prefixes)
  - [Option preparation function](#option-preparation-function)
- [.version(version)](#versionversion)
- [.arguments(arguments)](#argumentsarguments)
  - [Arguments declaration format](#arguments-declaration-format)
- [.command(command)](#commandcommand)
  - [Command declaration format](#command-declaration-format)
  - [Command-specific method .action(action)](#command-specific-method-actionaction)
  - [Command-specific method .description(description)](#command-specific-method-descriptiondescription)
  - [Command-specific method .alias(alias)](#command-specific-method-aliasalias)
  - [Command-specific method .option(flags)](#command-specific-method-optionsflags)
  - [Command-specific method .usage(usage)](#command-specific-method-usageusage)
- [.parse(action?)](#parseparse)
- [Automated --help](#automated---help)
- [Automated --version](#automated---version)

## Declaring program name (method: .name(name))

You can set name for your program. If you set name of your program then name going to show in title of your virtual terminal window, going to show in process list and in help program describtion. You can set program name with `.name(name: string)` method. Declaring name is optional operation and can be skip.

**Default:** current file name without extension

**Example:**

```js
require("cli-program")
    .name("My Awesome Program")
    .parse(() => {
        // bootstrap of your app
    });
```

**Command line usage:**

```
$ program --help
My Awesome Program

Usage:

  program
```

## Declaring program description (method: .description(description))

You can set detailed multiline description for your program. If you set description of your program then desciption going to show in help program description. You can set program description with `.description(description: string)` method. Declaring description is optional operation and can be skip.

**Default:** empty 

**Example:**

```js
require("cli-program")
    .name("My Awesome Program")
    .description("Multi-line detailed description")
    .parse(() => {
        // bootstrap of your app
    });
```

**Command line usage:**

```
$ program --help
My Awesome Program

  Multi-line detailed description

Usage:

  program
```

## Declaring usage block (method: .usage(usage))

Usage block generates automatically but you can declare custom usage block and describe usage format yourself. Declaration usage is optional operation and can be skip. Declare usage you can with `.usage()` method.

**Default:** generated

**Example:**

```js
require("cli-program")
    .usage("[options...]")
    .parse(() => {
        // bootstrap of your app
    });
```

**Command line usage:**

```
$ program --help
program

Usage:

  program [options...]
```

## Declaring common options (method: .option(flags, description, defaultValue, negativePrefixes, preparationFunction))

Your cli program in general can take options which started with dash or double dash. For this case for declaring you options you can use `.option(flags: string, description?: string, defaultValue?: any, negativePrefixes?: string[], preparationFunction?: (value: any) => any)` method. 

**Example:**

```js
require("cli-program")
    .version("0.1.0")
    .option("-p, --peppers", "Add peppers")
    .option("-P, --pineapple", "Add pineapple")
    .option("-b, --bbq-sauce", "Add bbq sauce")
    .option("-c, --cheese [type]", "Add the specified type of cheese [marble]", "marble")
    .parse((args, opts) => {
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

### Option flags

For declaring option you need declare required parameter flags. It is string and it has special format for describing options.

**Examples:**

```
--long
``` 

Declared only long option without short.

```
-s, --long
``` 

Declared both variants short and long.

```
-s, --long [type]
``` 

Declared both variants short and long with data type.

```
-s, --long [type=default]
``` 

Declared both variants short and long with data type and default value.

**Also**

Short flags may be passed as one single flag, for example `-abc` is equivalent to `-a -b -c`. 

Multi-word flags like as "--template-engine" for example are going to transit as camelcased properties in data object.

### Option description

### Option default value

### Option negative prefixes

### Option preparation function

Note that multi-word options starting with `--no` prefix negate the boolean value of the following word. For example, `--no-sauce` sets the value of `args.sauce` to false.

```js
require("cli-program")
    .version("0.1.0")
    .option("-p, --password <string>", "Password to connect", null, ["no", "without"])
    .parse((args, opts) => {
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
require("cli-program").arguments("[optional]");

// declare optional arguments
require("cli-program").arguments("[spread...]");

// declare required argument
require("cli-program").arguments("<required>");

// combination declare
require("cli-program").arguments("<argument1> <argument2> [more...]");
```

### Arguments declaration format

The arguments can be named anything. Angled brackets (e.g. `<required>`) indicate required input. Square brackets (e.g. `[optional]`) indicate optional input.

```js
require("cli-program")
    .arguments("<arg1> [args...]")
    .parse((args) => {
        console.log("args: %s", JSON.stringify(args));
    });
// $ node path/to/program value1 value2 value3
// args: {"arg1":"value1","args":["value2","value3"]}
```

```js
require("cli-program")
    .arguments("<arg1> [arg2]")
    .parse((args) => {
        console.log("args: %s", JSON.stringify(args));
    });
// $ node path/to/program value1
// args: {"arg1":"value1","arg2":null}
// $ node path/to/program value1 value2
// args: {"arg1":"value1","arg2":"value2"}
```

## .command(command)

### Command declaration format

### Command-specific method .action(action)

You can attach handler to a command.

```js
require("cli-program")
    .command("rm <dir>") // comand with required argument
    .action((args, opts) => {
        console.log("remove " + args.dir + (opts.recursive ? " recursively" : ""))
    })
    .parse()
```

### Command-specific method .options(flags)

You can attach options to a command.

```js
require("cli-program")
    .command("rm <dir>") // comand with required argument
    .option("-r, --recursive", "Remove recursively")
    .action((args, opts) => {
        console.log("remove " + args.dir + (opts.recursive ? " recursively" : ""))
    })
    .parse()
```

A command's options are validated when the command is used. Any unknown options will be reported as an error.

### Command-specific method .description(description)

You can attach description to a command.

```js
require("cli-program")
    .command("rm <dir>") // comand with required argument
    .description("Remove directory")
    .action((args, opts) => {
        console.log("remove " + args.dir + (opts.recursive ? " recursively" : ""))
    })
    .parse()
```

### Command-specific method .alias(alias)

You can attach alias to a command.

```js
require("cli-program")
    .command("remove <dir>") // comand with required argument
    .alias("rm")
    .action((args, opts) => {
        console.log("remove " + args.dir + (opts.recursive ? " recursively" : ""))
    })
    .parse()
```

### Command-specific method .usage(usage)

You can attach usage to a command.

```js
require("cli-program")
    .command("remove <dir>") // comand with required argument
    .usage("...special usage format...")
    .action((args, opts) => {
        console.log("remove " + args.dir + (opts.recursive ? " recursively" : ""))
    })
    .parse()
```

## Git-style sub-commands

```js
var program = require("cli-program");
program
  .version("0.1.0")
  .command("install [name]", "Install one or more packages")
  .action((args, opts) => {
    console.log("args: " + JSON.stringify(args));
    console.log("opts: " + JSON.stringify(opts));
  });
program
  .command("search [query]", "Search with optional query")
  .action((args, opts) => {
    console.log("args: " + JSON.stringify(args));
    console.log("opts: " + JSON.stringify(opts));
  });
program
  .command("list", "List packages installed")
  .action((args, opts) => {
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
