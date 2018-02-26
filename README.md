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

Calling the `version` implicitly adds the `-V` and `--version` options to the program.
When either of these options is present, the command prints the version number and exits.

```
$ ./examples/pizza -V
0.0.1
```

If you want your program to respond to the `-v` option instead of the `-V` option, simply pass custom flags to the `version` method using the same syntax as the `option` method:

```ts
program
  .version("0.0.1", "-v, --version");
```

or with special description:

```ts
program
  .version("0.0.1", "-v, --version", "My special description for version option");
```


The version flags can be named anything, but the long option is required.

## Command-specific options

You can attach options to a command.

```js
#!/usr/bin/env node

var program = require("commander");

program
  .command("rm <dir>")
  .option("-r, --recursive", "Remove recursively")
  .action(function (dir, cmd) {
    console.log("remove " + dir + (cmd.recursive ? " recursively" : ""))
  })

program.parse(process.argv)
```

A command"s options are validated when the command is used. Any unknown options will be reported as an error. However, if an action-based command does not define an action, then the options are not validated.

## Specify the argument syntax

```js
#!/usr/bin/env node

var program = require("commander");

program
  .version("0.1.0")
  .arguments("<cmd> [env]")
  .action(function (cmd, env) {
     cmdValue = cmd;
     envValue = env;
  });

program.parse(process.argv);

if (typeof cmdValue === "undefined") {
   console.error("no command given!");
   process.exit(1);
}
console.log("command:", cmdValue);
console.log("environment:", envValue || "no environment given");
```
Angled brackets (e.g. `<cmd>`) indicate required input. Square brackets (e.g. `[env]`) indicate optional input.

## Git-style sub-commands

```js
// file: ./examples/pm
var program = require("commander");

program
  .version("0.1.0")
  .command("install [name]", "install one or more packages")
  .command("search [query]", "search with optional query")
  .command("list", "list packages installed", {isDefault: true})
  .parse(process.argv);
```

When `.command()` is invoked with a description argument, no `.action(callback)` should be called to handle sub-commands, otherwise there will be an error. This tells commander that you"re going to use separate executables for sub-commands, much like `git(1)` and other popular tools.
The commander will try to search the executables in the directory of the entry script (like `./examples/pm`) with the name `program-command`, like `pm-install`, `pm-search`.

Options can be passed with the call to `.command()`. Specifying `true` for `opts.noHelp` will remove the option from the generated help output. Specifying `true` for `opts.isDefault` will run the subcommand if no other subcommand is specified.

If the program is designed to be installed globally, make sure the executables have proper modes, like `755`.

## Automated --help

 The help information is auto-generated based on the information commander already knows about your program, so the following `--help` info is for free:

```
 $ ./examples/pizza --help

   Usage: pizza [options]

   An application for pizzas ordering

   Options:

     -h, --help           output usage information
     -V, --version        output the version number
     -p, --peppers        Add peppers
     -P, --pineapple      Add pineapple
     -b, --bbq            Add bbq sauce
     -c, --cheese <type>  Add the specified type of cheese [marble]
     -C, --no-cheese      You do not want any cheese

```

## Examples

```js
var program = require("commander");

program
  .version("0.1.0")
  .option("-C, --chdir <path>", "change the working directory")
  .option("-c, --config <path>", "set config path. defaults to ./deploy.conf")
  .option("-T, --no-tests", "ignore test hook");

program
  .command("setup [env]")
  .description("run setup commands for all envs")
  .option("-s, --setup_mode [mode]", "Which setup mode to use")
  .action(function(env, options){
    var mode = options.setup_mode || "normal";
    env = env || "all";
    console.log("setup for %s env(s) with %s mode", env, mode);
  });

program
  .command("exec <cmd>")
  .alias("ex")
  .description("execute the given remote cmd")
  .option("-e, --exec_mode <mode>", "Which exec mode to use")
  .action(function(cmd, options){
    console.log("exec "%s" using %s mode", cmd, options.exec_mode);
  }).on("--help", function() {
    console.log("  Examples:");
    console.log();
    console.log("    $ deploy exec sequential");
    console.log("    $ deploy exec async");
    console.log();
  });

program
  .command("*")
  .action(function(env){
    console.log("deploying "%s"", env);
  });

program.parse(process.argv);
```

More Demos can be found in the [examples](https://github.com/tj/cli-program/tree/master/examples) directory.

## License

MIT