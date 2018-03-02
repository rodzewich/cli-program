"use strict";
require("../build/index")
    // Program have 1 required argument
    // and 1 optional argument.
    .arguments("<arg1> [arg2]")
    .parse(function (args) {
        console.log("args: %s", JSON.stringify(args));
    });

/**
 * $ node ./examples/arguments1.js --help
 * arguments1
 *
 * Usage:
 *
 *   arguments1 [options...] <arg1> [arg2]
 *
 * Options:
 *
 *   -h, --help           Show help
 *   --no-color,
 *   --color [value=null] Disable/enable output colors
 */

/**
 * $ node ./examples/arguments1.js
 * Error: Invalid number of arguments.
 */

/**
 * $ node ./examples/arguments1.js value1
 * args: {"arg1":"value1","arg2":null}
 */

/**
 * $ node ./examples/arguments1.js value1 value2
 * args: {"arg1":"value1","arg2":"value2"}
 */