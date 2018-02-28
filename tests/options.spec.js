"use strict";
var fs = require("fs"),
    util = require("util"),
    expect = require("chai").expect;
require("./sourcemap");
var ProgramWrapper = require("../build/index").ProgramWrapper,
    removeProgramDeclaration = require("../build/index").removeProgramDeclaration,
    cleanColors  = require("./utils").cleanColors,
    stdout = require("../build/index").setStdoutHandlerForProgram,
    stderr = require("../build/index").setStderrHandlerForProgram,
    exit   = require("../build/index").setExitHandlerForProgram;


describe("Program options", function () {

    it("", function () {
        var program = new ProgramWrapper(),
            content = [];
        stdout(program, function (stdout) {
            content.push(stdout);
        });
        stderr(program, function (stderr) {
            process.stderr.write(stderr);
        });
        exit(program, function (code) {
            expect(code).to.equal(0);
            expect(content.join("")).to.equal("Version: 0.0.1\n");
            removeProgramDeclaration(program);
        });
        /*program
            .option("-A, --custom-1 <value>", "Description 1")
            .option("-B, --custom-2 <value>", "Description 2")
            .option("-C, --custom-3 <value>", "Description 3")
            .parse(null, [null, "program", "-ABC"]);*/
    });

});
