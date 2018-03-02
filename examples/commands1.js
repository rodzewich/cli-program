"use strict";
var program = require("../build/index");
program
    .command("command1 <required>")
    .alias("cmd1")
    .description("Command with one required argument")
    .option("-O, --option", "Command-specific option")
    .action(function (args, opts) {
        console.log("args: %s", JSON.stringify(args));
        console.log("opts: %s", JSON.stringify(opts));
    });
program
    .command("command2 [optional]")
    .alias("cmd2")
    .description("Command with one optional argument")
    .option("-O, --option", "Command-specific option")
    .action(function (args, opts) {
        console.log("args: %s", JSON.stringify(args));
        console.log("opts: %s", JSON.stringify(opts));
    });
program
    .command("command3 [spread...]")
    .alias("cmd3")
    .description("Command with more optional arguments")
    .option("-O, --option", "Command-specific option")
    .action(function (args, opts) {
        console.log("args: %s", JSON.stringify(args));
        console.log("opts: %s", JSON.stringify(opts));
    });
program
    .command("command4 <argument> [more...]")
    .alias("cmd4")
    .description("Command with combined arguments")
    .option("-O, --option", "Command-specific option")
    .action(function (args, opts) {
        console.log("args: %s", JSON.stringify(args));
        console.log("opts: %s", JSON.stringify(opts));
    });
program.parse();

/**
 * $ node ./examples/commands1.js --help
 * commands1
 *
 * Usage:
 *
 *   commands1 [options...] <command> [arguments...] [options...]
 *
 * Options:
 *
 *   -h, --help           Show help
 *   --no-color,
 *   --color [value=null] Disable/enable output colors
 *
 * Commands:
 *
 *   command1 (alias: cmd1) <required>
 *     Command with one required argument
 *
 *   command2 (alias: cmd2) [optional]
 *     Command with one optional argument
 *
 *   command3 (alias: cmd3) [spread...]
 *     Command with more optional arguments
 *
 *   command4 (alias: cmd4) <argument> [more...]
 *     Command with combined arguments
 */
