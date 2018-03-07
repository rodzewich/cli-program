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


describe("Errors", function () {

    it("Error: You cannot use undeclared \"-U\" option.", function (done) {
        var program = new ProgramWrapper(),
            content = [];
        stdout(program, function (stdout) {
            content.push(stdout);
        });
        stderr(program, function (stderr) {
            content.push(stderr);
        });
        exit(program, function (code) {
            expect(code).to.equal(1);
            expect(cleanColors(content.join("")).replace(/\s+/gm, " ")).to.have.string("Error: You cannot use undeclared \"-U\" option.");
            removeProgramDeclaration(program);
            done();
        });
        program
            .parse(null, [null, "program", "-U"]);
    });

    it("Error: You cannot use undeclared \"--undeclared-option\" option.", function (done) {
        var program = new ProgramWrapper(),
            content = [];
        stdout(program, function (stdout) {
            content.push(stdout);
        });
        stderr(program, function (stderr) {
            content.push(stderr);
        });
        exit(program, function (code) {
            expect(code).to.equal(1);
            expect(cleanColors(content.join("")).replace(/\s+/gm, " ")).to.have.string("Error: You cannot use undeclared \"--undeclared-option\" option.");
            removeProgramDeclaration(program);
            done();
        });
        program
            .parse(null, [null, "program", "--undeclared-option"]);
    });

    it("Error: You cannot use undeclared \"-U\" option in \"command\"(alias: \"cmd\") command.", function (done) {
        var program = new ProgramWrapper(),
            content = [];
        stdout(program, function (stdout) {
            content.push(stdout);
        });
        stderr(program, function (stderr) {
            content.push(stderr);
        });
        exit(program, function (code) {
            expect(code).to.equal(1);
            expect(cleanColors(content.join("")).replace(/\s+/gm, " ")).to.have.string("Error: You cannot use undeclared \"-U\" option in \"command\"(alias: \"cmd\") command.");
            removeProgramDeclaration(program);
            done();
        });
        program
            .command("command")
            .alias("cmd");
        program
            .parse(null, [null, "program", "command", "-U"]);
    });

    it("Error: You cannot use undeclared \"--undeclared-option\" option in \"command\"(alias: \"cmd\") command.", function (done) {
        var program = new ProgramWrapper(),
            content = [];
        stdout(program, function (stdout) {
            content.push(stdout);
        });
        stderr(program, function (stderr) {
            content.push(stderr);
        });
        exit(program, function (code) {
            expect(code).to.equal(1);
            expect(cleanColors(content.join("")).replace(/\s+/gm, " ")).to.have.string("Error: You cannot use undeclared \"--undeclared-option\" option in \"command\"(alias: \"cmd\") command.");
            removeProgramDeclaration(program);
            done();
        });
        program
            .command("command")
            .alias("cmd");
        program
            .parse(null, [null, "program", "command", "--undeclared-option"]);
    });

    it("Error: You cannot use option \"--option\"(\"-O\") without value.", function (done) {
        var program = new ProgramWrapper(),
            content = [];
        stdout(program, function (stdout) {
            content.push(stdout);
        });
        stderr(program, function (stderr) {
            content.push(stderr);
        });
        exit(program, function (code) {
            expect(code).to.equal(1);
            expect(cleanColors(content.join("")).replace(/\s+/gm, " ")).to.have.string("Error: You cannot use option \"--option\"(\"-O\") without value.");
            removeProgramDeclaration(program);
            done();
        });
        program
            .option("-O, --option <string>")
            .parse(null, [null, "program", "--option"]);
    });

    it("Error: You cannot use option \"--option\"(\"-O\") in \"command\"(alias: \"cmd\") command without value.", function (done) {
        var program = new ProgramWrapper(),
            content = [];
        stdout(program, function (stdout) {
            content.push(stdout);
        });
        stderr(program, function (stderr) {
            content.push(stderr);
        });
        exit(program, function (code) {
            expect(code).to.equal(1);
            expect(cleanColors(content.join("")).replace(/\s+/gm, " ")).to.have.string("Error: You cannot use option \"--option\"(\"-O\") in \"command\"(alias: \"cmd\") command without value.");
            removeProgramDeclaration(program);
            done();
        });
        program
            .command("command")
            .alias("cmd")
            .option("-O, --option <string>");
        program
            .parse(null, [null, "program", "command", "--option"]);
    });

    it("Error: Invalid number of program arguments. Program require 2 argument(s).", function (done) {
        var program = new ProgramWrapper(),
            content = [];
        stdout(program, function (stdout) {
            content.push(stdout);
        });
        stderr(program, function (stderr) {
            content.push(stderr);
        });
        exit(program, function (code) {
            expect(code).to.equal(1);
            expect(cleanColors(content.join("")).replace(/\s+/gm, " ")).to.have.string("Error: Invalid number of program arguments. Program require 2 argument(s).");
            removeProgramDeclaration(program);
            done();
        });
        program
            .arguments("<argument1> <argument2>");
        program
            .parse(null, [null, "program", "value1"]);
    });

    it("Error: Invalid number of command arguments. Command \"command\"(alias: \"cmd\") require 2 argument(s).", function (done) {
        var program = new ProgramWrapper(),
            content = [];
        stdout(program, function (stdout) {
            content.push(stdout);
        });
        stderr(program, function (stderr) {
            content.push(stderr);
        });
        exit(program, function (code) {
            expect(code).to.equal(1);
            expect(cleanColors(content.join("")).replace(/\s+/gm, " ")).to.have.string("Error: Invalid number of command arguments. Command \"command\"(alias: \"cmd\") require 2 argument(s).");
            removeProgramDeclaration(program);
            done();
        });
        program
            .command("command <argument1> <argument2>")
            .alias("cmd");
        program
            .parse(null, [null, "program", "command", "value1"]);
    });

    it("Error: You should specify required option \"--option\"(\"-O\").", function (done) {
        var program = new ProgramWrapper(),
            content = [];
        stdout(program, function (stdout) {
            content.push(stdout);
        });
        stderr(program, function (stderr) {
            content.push(stderr);
        });
        exit(program, function (code) {
            expect(code).to.equal(1);
            expect(cleanColors(content.join("")).replace(/\s+/gm, " ")).to.have.string("Error: You should specify required option \"--option\"(\"-O\").");
            removeProgramDeclaration(program);
            done();
        });
        program
            .option("-O, --option <string>")
            .parse(null, [null, "program"]);
    });

    it("Error: You should specify required option \"--option\"(\"-O\") in \"command\"(alias: \"cmd\") command.", function (done) {
        var program = new ProgramWrapper(),
            content = [];
        stdout(program, function (stdout) {
            content.push(stdout);
        });
        stderr(program, function (stderr) {
            content.push(stderr);
        });
        exit(program, function (code) {
            expect(code).to.equal(1);
            expect(cleanColors(content.join("")).replace(/\s+/gm, " ")).to.have.string("Error: You should specify required option \"--option\"(\"-O\") in \"command\"(alias: \"cmd\") command.");
            removeProgramDeclaration(program);
            done();
        });
        program
            .command("command")
            .alias("cmd")
            .option("-O, --option <string>");
        program
            .parse(null, [null, "program", "command"]);
    });

    it("Error: You should specify command.", function (done) {
        var program = new ProgramWrapper(),
            content = [];
        stdout(program, function (stdout) {
            content.push(stdout);
        });
        stderr(program, function (stderr) {
            content.push(stderr);
        });
        exit(program, function (code) {
            expect(code).to.equal(1);
            expect(cleanColors(content.join("")).replace(/\s+/gm, " ")).to.have.string("Error: You should specify command.");
            removeProgramDeclaration(program);
            done();
        });
        program
            .command("command")
            .alias("cmd")
            .option("-O, --option <string>");
        program
            .parse(null, [null, "program"]);
    });

    it("Error: You cannot continue without default handler.", function (done) {
        var program = new ProgramWrapper(),
            content = [];
        stdout(program, function (stdout) {
            content.push(stdout);
        });
        stderr(program, function (stderr) {
            content.push(stderr);
        });
        exit(program, function (code) {
            expect(code).to.equal(1);
            expect(cleanColors(content.join("")).replace(/\s+/gm, " ")).to.have.string("Error: You cannot continue without default handler.");
            removeProgramDeclaration(program);
            done();
        });
        program
            .parse(null, [null, "program"]);
    });

    it("Error: You cannot continue without handler for \"command\"(alias: \"cmd\") command.", function (done) {
        var program = new ProgramWrapper(),
            content = [];
        stdout(program, function (stdout) {
            content.push(stdout);
        });
        stderr(program, function (stderr) {
            content.push(stderr);
        });
        exit(program, function (code) {
            expect(code).to.equal(1);
            expect(cleanColors(content.join("")).replace(/\s+/gm, " ")).to.have.string("Error: You cannot continue without handler for \"command\"(alias: \"cmd\") command.");
            removeProgramDeclaration(program);
            done();
        });
        program
            .command("command")
            .alias("cmd");
        program
            .parse(null, [null, "program", "command"]);
    });

});
