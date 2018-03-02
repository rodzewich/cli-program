"use strict";
var program = require("../build/index");
program
    .name("Server Tool")
    .version("0.0.1")
    .option("-U, --db-user <string>", "User for connect to DB")
    .option("-P, --db-password <string>", "Password for connect to DB", null, ["no", "without"])
    .option("-S, --db-socket <path>", "Socket to connect");
program
    .command("install <plugin>")
    .alias("i")
    .description("Install additional plugin")
    .option("-R, --recursive [number]", "Recursive level", 1)
    .action(function (args, opts) {
        console.log("Plugin: %s", args.plugin);
        console.log("Recursive: %s", opts.recursive);
    });
program
    .command("search <keyword> [keywords...]")
    .alias("s")
    .description("Install additional plugin")
    .option("-R, --recursive", "Search recursive")
    .action(function (args, opts) {
        console.log("keyword: %s", JSON.stringify(args.keyword));
        console.log("keywords: %s", JSON.stringify(args.keywords));
    });
program.parse();

/**
 * $ node ./examples/server-tool.js --help
 * Server Tool
 *
 * Usage:
 *
 *   server-tool [options...] <command> [arguments...] [options...]
 *
 * Options:
 *
 *   -h, --help                 Show help
 *   --no-color,
 *   --color [value=null]       Disable/enable output colors
 *   -V, --version              Show version.
 *   -U, --db-user <string>     User for connect to DB
 *   --no-db-password,
 *   --without-db-password,
 *   -P, --db-password <string> Password for connect to DB
 *   -S, --db-socket <path>     Socket to connect
 *
 * Commands:
 *
 *   install (alias: i) <plugin>
 *     Install additional plugin
 *
 *   search (alias: s) <keyword> [keywords...]
 *     Install additional plugin
 */

/**
 * $ node ./examples/server-tool.js install --help
 * Server Tool
 *
 * Usage:
 *
 *   server-tool [options...] install <plugin> [options...]
 *
 * Description:
 *
 *   Install additional plugin
 *
 * General Options:
 *
 *   -h, --help                 Show help
 *   --no-color,
 *   --color [value=null]       Disable/enable output colors
 *   -V, --version              Show version.
 *   -U, --db-user <string>     User for connect to DB
 *   --no-db-password,
 *   --without-db-password,
 *   -P, --db-password <string> Password for connect to DB
 *   -S, --db-socket <path>     Socket to connect
 *
 * Command Options:
 *
 *   -h, --help                 Show help
 *   -R, --recursive [number=1] Recursive level
 */
