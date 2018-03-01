"use strict";
var fs = require("fs"),
    util = require("util"),
    expect = require("chai").expect;
require("./sourcemap");
var ProgramWrapper = require("../build/index-test").ProgramWrapper,
    removeProgramDeclaration = require("../build/index-test").removeProgramDeclaration,
    cleanColors  = require("./utils").cleanColors,
    stdout = require("../build/index-test").setStdoutHandlerForProgram,
    stderr = require("../build/index-test").setStderrHandlerForProgram,
    exit   = require("../build/index-test").setExitHandlerForProgram;


describe("Program version", function () {

    it("Use version by regular option \"-V\"", function (done) {
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
            done();
        });
        program
            .version("0.0.1")
            .parse(null, [null, "program", "-V"]);
    });

    it("Use version by regular option \"--version\"", function (done) {
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
            done();
        });
        program
            .version("0.0.1")
            .parse(null, [null, "program", "--version"]);
    });

    it("Use version by custom flags \"--myVersion\" (camel case)", function (done) {
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
            done();
        });
        program
            .version("0.0.1", "--my-version")
            .parse(null, [null, "program", "--myVersion"]);
    });

    it("Use version by custom flags \"--my-version\" (kebab case)", function (done) {
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
            done();
        });
        program
            .version("0.0.1", "--my-version")
            .parse(null, [null, "program", "--my-version"]);
    });

    it("Use version by custom flags \"--my_version\" (snake case)", function (done) {
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
            done();
        });
        program
            .version("0.0.1", "--my-version")
            .parse(null, [null, "program", "--my_version"]);
    });

    it("Use regular version flags in help", function (done) {
        var program = new ProgramWrapper(),
            content = [];
        stdout(program, function (stdout) {
            content.push(cleanColors(stdout));
        });
        stderr(program, function (stderr) {
            process.stderr.write(stderr);
        });
        exit(program, function (code) {
            expect(code).to.equal(0);
            expect(content.join("")).to.have.string("-V, --version");
            expect(content.join("")).to.have.string("Show version");
            removeProgramDeclaration(program);
            done();
        });
        program
            .version("0.0.1")
            .parse(null, [null, "program", "--help"]);
    });

    it("Use long custom version flags in help", function (done) {
        var program = new ProgramWrapper(),
            content = [];
        stdout(program, function (stdout) {
            content.push(cleanColors(stdout));
        });
        stderr(program, function (stderr) {
            process.stderr.write(stderr);
        });
        exit(program, function (code) {
            expect(code).to.equal(0);
            expect(content.join("")).to.have.string("--custom-version-flag");
            expect(content.join("")).to.have.string("Show version");
            removeProgramDeclaration(program);
            done();
        });
        program
            .version("0.0.1", "--custom-version-flag")
            .parse(null, [null, "program", "--help"]);
    });

    it("Use short custom version flags in help", function (done) {
        var program = new ProgramWrapper(),
            content = [];
        stdout(program, function (stdout) {
            content.push(cleanColors(stdout));
        });
        stderr(program, function (stderr) {
            process.stderr.write(stderr);
        });
        exit(program, function (code) {
            expect(code).to.equal(0);
            expect(content.join("")).to.have.string("-C");
            expect(content.join("")).to.have.string("Show version");
            removeProgramDeclaration(program);
            done();
        });
        program
            .version("0.0.1", "-C")
            .parse(null, [null, "program", "--help"]);
    });

    it("Use custom version flags with description in help", function (done) {
        var program = new ProgramWrapper(),
            content = [];
        stdout(program, function (stdout) {
            content.push(cleanColors(stdout));
        });
        stderr(program, function (stderr) {
            process.stderr.write(stderr);
        });
        exit(program, function (code) {
            expect(code).to.equal(0);
            expect(content.join("")).to.have.string("-V, --custom-version-flag");
            expect(content.join("")).to.have.string("Custom description");
            removeProgramDeclaration(program);
            done();
        });
        program
            .version("0.0.1", "-V, --custom-version-flag", "Custom description")
            .parse(null, [null, "program", "--help"]);
    });

    it("Use version without declaration", function (done) {
        var program = new ProgramWrapper(),
            content = [];
        stdout(program, function (stdout) {
            content.push(cleanColors(stdout));
        });
        stderr(program, function (stderr) {
            process.stderr.write(stderr);
        });
        exit(program, function (code) {
            expect(code).to.equal(0);
            expect(content.join("")).to.not.have.string("-V");
            expect(content.join("")).to.not.have.string("--version");
            expect(content.join("")).to.not.have.string("Show version");
            removeProgramDeclaration(program);
            done();
        });
        program.parse(null, [null, "program", "--help"]);
    });

});
