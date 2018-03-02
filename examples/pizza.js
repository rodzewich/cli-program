"use strict";
require("../build/index")
    .name("pizza")
    .version("0.0.1")
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

/**
 * $ node ./examples/pizza.js --help
 * pizza
 *
 * Usage:
 *
 *   pizza [options...]
 *
 * Options:
 *
 *   -h, --help                   Show help
 *   --no-color,
 *   --color [value=null]         Disable/enable output colors
 *   -V, --version                Show version.
 *   -p, --peppers                Add peppers
 *   -P, --pineapple              Add pineapple
 *   -b, --bbq-sauce              Add bbq sauce
 *   -c, --cheese [type="marble"] Add the specified type of cheese [marble]
 */
