"use strict";
require("../build/index")
    // Program have 1 required argument
    // and more optional arguments.
    .arguments("<arg1> [args...]")
    .parse(function (args) {
        console.log("args: %s", JSON.stringify(args));
    });

/**
 * $ node ./examples/arguments2.js --help
 * arguments2
 *
 * Usage:
 *
 *   arguments2 [options...] <arg1> [args...]
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
 * args: {"arg1":"value1","args":[]}
 */

/**
 * $ node ./examples/arguments1.js value1 value2
 * args: {"arg1":"value1","args":["value2"]}
 */

/**
 * $ node ./examples/arguments1.js value1 value2 value3
 * args: {"arg1":"value1","args":["value2","value3"]}
 */
