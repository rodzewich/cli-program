"use strict";
var fs = require("fs"),
    util = require("util"),
    expect = require("chai").expect;
require("./sourcemap");
var ProgramWrapper = require("../build/index").ProgramWrapper;

// TODO: check help description

describe("Program arguments", function () {

    it("Use: <required-argument-1> <required-argument-2> [optional-argument]", function (done) {
        new ProgramWrapper()
            .arguments("<required-argument-1> <required-argument-2> [optional-argument]")
            .parse(function (args) {
                expect(args).to.have.property("requiredArgument1", "argument1");
                expect(args).to.have.property("requiredArgument2", "argument2");
                expect(args).to.have.property("optionalArgument", null);
                done();
            }, [null, "program", "argument1", "argument2"]);
    });

    it("Use: <required_argument_1> <required_argument_2> [optional_argument]", function (done) {
        new ProgramWrapper()
            .arguments("<required_argument_1> <required_argument_2> [optional_argument]")
            .parse(function (args) {
                expect(args).to.have.property("requiredArgument1", "argument1");
                expect(args).to.have.property("requiredArgument2", "argument2");
                expect(args).to.have.property("optionalArgument", null);
                done();
            }, [null, "program", "argument1", "argument2"]);
    });

    it("Use: <requiredArgument1> <requiredArgument2> [optionalArgument]", function (done) {
        new ProgramWrapper()
            .arguments("<requiredArgument1> <requiredArgument2> [optionalArgument]")
            .parse(function (args) {
                expect(args).to.have.property("requiredArgument1", "argument1");
                expect(args).to.have.property("requiredArgument2", "argument2");
                expect(args).to.have.property("optionalArgument", null);
                done();
            }, [null, "program", "argument1", "argument2"]);
    });

    it("Use: <required-argument-1> <required-argument-2> [optional-argument] with optional data", function (done) {
        new ProgramWrapper()
            .arguments("<required-argument-1> <required-argument-2> [optional-argument]")
            .parse(function (args) {
                expect(args).to.have.property("requiredArgument1", "argument1");
                expect(args).to.have.property("requiredArgument2", "argument2");
                expect(args).to.have.property("optionalArgument", "optional");
                done();
            }, [null, "program", "argument1", "argument2", "optional"]);
    });

    it("Use: <required_argument_1> <required_argument_2> [optional_argument] with optional data", function (done) {
        new ProgramWrapper()
            .arguments("<required_argument_1> <required_argument_2> [optional_argument]")
            .parse(function (args) {
                expect(args).to.have.property("requiredArgument1", "argument1");
                expect(args).to.have.property("requiredArgument2", "argument2");
                expect(args).to.have.property("optionalArgument", "optional");
                done();
            }, [null, "program", "argument1", "argument2", "optional"]);
    });

    it("Use: <requiredArgument1> <requiredArgument2> [optionalArgument] with optional data", function (done) {
        new ProgramWrapper()
            .arguments("<requiredArgument1> <requiredArgument2> [optionalArgument]")
            .parse(function (args) {
                expect(args).to.have.property("requiredArgument1", "argument1");
                expect(args).to.have.property("requiredArgument2", "argument2");
                expect(args).to.have.property("optionalArgument", "optional");
                done();
            }, [null, "program", "argument1", "argument2", "optional"]);
    });

    it("Use: <required-argument-1> <required-argument-2> [spread-arguments...]", function (done) {
        new ProgramWrapper()
            .arguments("<required-argument-1> <required-argument-2> [spread-arguments...]")
            .parse(function (args) {
                expect(args).to.have.property("requiredArgument1", "argument1");
                expect(args).to.have.property("requiredArgument2", "argument2");
                expect(args).to.have.property("spreadArguments");
                expect(args.spreadArguments).to.have.lengthOf(0);
                done();
            }, [null, "program", "argument1", "argument2"]);
    });

    it("Use: <required_argument_1> <required_argument_2> [spread_arguments...]", function (done) {
        new ProgramWrapper()
            .arguments("<required_argument_1> <required_argument_2> [spread_arguments...]")
            .parse(function (args) {
                expect(args).to.have.property("requiredArgument1", "argument1");
                expect(args).to.have.property("requiredArgument2", "argument2");
                expect(args).to.have.property("spreadArguments");
                expect(args.spreadArguments).to.have.lengthOf(0);
                done();
            }, [null, "program", "argument1", "argument2"]);
    });

    it("Use: <requiredArgument1> <requiredArgument2> [spreadArguments...]", function (done) {
        new ProgramWrapper()
            .arguments("<requiredArgument1> <requiredArgument2> [spreadArguments...]")
            .parse(function (args) {
                expect(args).to.have.property("requiredArgument1", "argument1");
                expect(args).to.have.property("requiredArgument2", "argument2");
                expect(args).to.have.property("spreadArguments");
                expect(args.spreadArguments).to.have.lengthOf(0);
                done();
            }, [null, "program", "argument1", "argument2"]);
    });

    it("Use: <required-argument-1> <required-argument-2> [spread-arguments...] with spread data", function (done) {
        new ProgramWrapper()
            .arguments("<required-argument-1> <required-argument-2> [spread-arguments...]")
            .parse(function (args) {
                expect(args).to.have.property("requiredArgument1", "argument1");
                expect(args).to.have.property("requiredArgument2", "argument2");
                expect(args).to.have.property("spreadArguments");
                expect(args.spreadArguments).to.have.lengthOf(3);
                expect(args.spreadArguments).to.include.members(["1"]);
                expect(args.spreadArguments).to.include.members(["2"]);
                expect(args.spreadArguments).to.include.members(["3"]);
                done();
            }, [null, "program", "argument1", "argument2", "1", "2", "3"]);
    });

    it("Use: <required_argument_1> <required_argument_2> [spread_arguments...] with spread data", function (done) {
        new ProgramWrapper()
            .arguments("<required_argument_1> <required_argument_2> [spread_arguments...]")
            .parse(function (args) {
                expect(args).to.have.property("requiredArgument1", "argument1");
                expect(args).to.have.property("requiredArgument2", "argument2");
                expect(args).to.have.property("spreadArguments");
                expect(args.spreadArguments).to.have.lengthOf(3);
                expect(args.spreadArguments).to.include.members(["1"]);
                expect(args.spreadArguments).to.include.members(["2"]);
                expect(args.spreadArguments).to.include.members(["3"]);
                done();
            }, [null, "program", "argument1", "argument2", "1", "2", "3"]);
    });

    it("Use: <requiredArgument1> <requiredArgument2> [spreadArguments...] with spread data", function (done) {
        new ProgramWrapper()
            .arguments("<requiredArgument1> <requiredArgument2> [spreadArguments...]")
            .parse(function (args) {
                expect(args).to.have.property("requiredArgument1", "argument1");
                expect(args).to.have.property("requiredArgument2", "argument2");
                expect(args).to.have.property("spreadArguments");
                expect(args.spreadArguments).to.have.lengthOf(3);
                expect(args.spreadArguments).to.include.members(["1"]);
                expect(args.spreadArguments).to.include.members(["2"]);
                expect(args.spreadArguments).to.include.members(["3"]);
                done();
            }, [null, "program", "argument1", "argument2", "1", "2", "3"]);
    });

});
