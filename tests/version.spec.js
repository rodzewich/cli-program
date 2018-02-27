"use strict";
var fs = require("fs"),
    util = require("util"),
    expect = require("chai").expect;
require("./sourcemap");
var ProgramWrapper = require("../build/index").ProgramWrapper,
    removeProgramDeclaration = require("../build/index").removeProgramDeclaration,
    stdout = require("../build/index").setStdoutHandlerForProgram,
    stderr = require("../build/index").setStderrHandlerForProgram,
    exit   = require("../build/index").setExitHandlerForProgram;


describe("Program version", function () {
    it("Show version by regular option \"--version\"", function () {
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
        program.version("0.0.1");
        program.parse(
            null,
            [null, "program", "--version"]
        );
    });
    it("Show version by regular option \"-V\"", function () {
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
        program.version("0.0.1");
        program.parse(
            null,
            [null, "program", "-V"]
        );
    });
    it("Show version by custom flags \"--my-version\"", function () {
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
        program.version("0.0.1", "--my-version");
        program.parse(
            null,
            [null, "program", "--my-version"]
        );
    });
});
