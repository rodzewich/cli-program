"use strict";
var fs = require("fs"),
    util = require("util"),
    expect = require("chai").expect;
require("./sourcemap");
var factory = require("./factory");

describe("Program version", function () {
    it("Show version by regular option \"--version\"", function () {
        var program = factory(),
            content = [];
        program.version("0.0.1");
        program.parse(
            null,
            [null, "program", "--version"],
            function (stdout) {
                content.push(stdout);
            },
            function (stderr) {
                process.stderr.write(stderr);
            },
            function (code) {
                expect(code).to.equal(0);
                expect(content.join("")).to.equal("Version: 0.0.1\n");
            }
        );
    });
    it("Show version by regular option \"-V\"", function () {
        var program = factory(),
            content = [];
        program.version("0.0.1");
        program.parse(
            null,
            [null, "program", "-V"],
            function (stdout) {
                content.push(stdout);
            },
            function (stderr) {
                process.stderr.write(stderr);
            },
            function (code) {
                expect(code).to.equal(0);
                expect(content.join("")).to.equal("Version: 0.0.1\n");
            }
        );
    });
    it("Show version by custom flags \"--my-version\"", function () {
        var program = factory(),
            content = [];
        program.version("0.0.1", "--my-version");
        program.parse(
            null,
            [null, "program", "--my-version"],
            function (stdout) {
                content.push(stdout);
            },
            function (stderr) {
                process.stderr.write(stderr);
            },
            function (code) {
                expect(code).to.equal(0);
                expect(content.join("")).to.equal("Version: 0.0.1\n");
            }
        );
    });
});
