"use strict";
var fs = require("fs"),
    util = require("util"),
    expect = require("chai").expect;
require("./sourcemap");
var ProgramWrapper = require("../build/index-test").ProgramWrapper;

// TODO: check help description

describe("Program options", function () {

    it("Use short boolean options in bunch", function (done) {
        new ProgramWrapper()
            .option("-A, --custom-1")
            .option("-B, --custom-2")
            .option("-C, --custom-3")
            .parse(function (args, opts) {
                expect(opts).to.have.property("custom1", true);
                expect(opts).to.have.property("custom2", true);
                expect(opts).to.have.property("custom3", true);
                done();
            }, [null, "program", "-ABC"]);
    });

    it("Use short boolean options as is", function (done) {
        new ProgramWrapper()
            .option("-A, --custom-1")
            .option("-B, --custom-2")
            .option("-C, --custom-3")
            .parse(function (args, opts) {
                expect(opts).to.have.property("custom1", true);
                expect(opts).to.have.property("custom2", true);
                expect(opts).to.have.property("custom3", true);
                done();
            }, [null, "program", "-A", "-B", "-C"]);
    });

    it("Use long boolean options as is (kebab case)", function (done) {
        new ProgramWrapper()
            .option("-A, --custom-1")
            .option("-B, --custom-2")
            .option("-C, --custom-3")
            .parse(function (args, opts) {
                expect(opts).to.have.property("custom1", true);
                expect(opts).to.have.property("custom2", true);
                expect(opts).to.have.property("custom3", true);
                done();
            }, [null, "program", "--custom-1", "--custom-2", "--custom-3"]);
    });

    it("Use long boolean options as is (snake case)", function (done) {
        new ProgramWrapper()
            .option("-A, --custom-1")
            .option("-B, --custom-2")
            .option("-C, --custom-3")
            .parse(function (args, opts) {
                expect(opts).to.have.property("custom1", true);
                expect(opts).to.have.property("custom2", true);
                expect(opts).to.have.property("custom3", true);
                done();
            }, [null, "program", "--custom_1", "--custom_2", "--custom_3"]);
    });

    it("Use long boolean options as is (camel case)", function (done) {
        new ProgramWrapper()
            .option("-A, --custom-1")
            .option("-B, --custom-2")
            .option("-C, --custom-3")
            .parse(function (args, opts) {
                expect(opts).to.have.property("custom1", true);
                expect(opts).to.have.property("custom2", true);
                expect(opts).to.have.property("custom3", true);
                done();
            }, [null, "program", "--custom1", "--custom2", "--custom3"]);
    });

    it("Use optional options with defaults", function (done) {
        new ProgramWrapper()
            .option("-A, --custom-1 [number]", null, 0)
            .option("-B, --custom-2 [string]", null, "")
            .option("-C, --custom-3 [boolean]", null, false)
            .parse(function (args, opts) {
                expect(opts).to.have.property("custom1", 0);
                expect(opts).to.have.property("custom2", "");
                expect(opts).to.have.property("custom3", false);
                done();
            }, [null, "program"]);
    });

    it("Use short number option (dec)", function (done) {
        new ProgramWrapper()
            .option("-N, --number <number>")
            .parse(function (args, opts) {
                expect(opts).to.have.property("number", 123);
                done();
            }, [null, "program", "-N=123"]);
    });

    it("Use short number option (oct)", function (done) {
        new ProgramWrapper()
            .option("-N, --number <number>")
            .parse(function (args, opts) {
                expect(opts).to.have.property("number", 123);
                done();
            }, [null, "program", "-N=0173"]);
    });

    it("Use short number option (hex)", function (done) {
        new ProgramWrapper()
            .option("-N, --number <number>")
            .parse(function (args, opts) {
                expect(opts).to.have.property("number", 123);
                done();
            }, [null, "program", "-N", "0x7B"]);
    });

    it("Use long number option (dec)", function (done) {
        new ProgramWrapper()
            .option("-N, --number <number>")
            .parse(function (args, opts) {
                expect(opts).to.have.property("number", 123);
                done();
            }, [null, "program", "--number=123"]);
    });

    it("Use long number option (oct)", function (done) {
        new ProgramWrapper()
            .option("-N, --number <number>")
            .parse(function (args, opts) {
                expect(opts).to.have.property("number", 123);
                done();
            }, [null, "program", "--number=0173"]);
    });

    it("Use long number option (hex)", function (done) {
        new ProgramWrapper()
            .option("-N, --number <number>")
            .parse(function (args, opts) {
                expect(opts).to.have.property("number", 123);
                done();
            }, [null, "program", "--number", "0x7B"]);
    });

    it("Use short boolean option", function (done) {
        new ProgramWrapper()
            .option("-A, --custom-1")
            .option("-B, --custom-2")
            .option("-C, --custom-3")
            .option("-D, --custom-4")
            .option("-E, --custom-5")
            .option("-F, --custom-6")
            .option("-G, --custom-7")
            .option("-H, --custom-8")
            .option("-L, --custom-9")
            .parse(function (args, opts) {
                expect(opts).to.have.property("custom1", false);
                expect(opts).to.have.property("custom2", false);
                expect(opts).to.have.property("custom3", false);
                expect(opts).to.have.property("custom4", false);
                expect(opts).to.have.property("custom5", false);
                expect(opts).to.have.property("custom6", true);
                expect(opts).to.have.property("custom7", true);
                expect(opts).to.have.property("custom8", true);
                expect(opts).to.have.property("custom9", true);
                done();
            }, [null, "program", "-A=", "-B=0", "-C=no", "-D=off", "-E=false",
                "-F=1", "-G=yes", "-H=on", "-L=true"]);
    });

    it("Use long boolean option", function (done) {
        new ProgramWrapper()
            .option("-A, --custom-1")
            .option("-B, --custom-2")
            .option("-C, --custom-3")
            .option("-D, --custom-4")
            .option("-E, --custom-5")
            .option("-F, --custom-6")
            .option("-G, --custom-7")
            .option("-H, --custom-8")
            .option("-L, --custom-9")
            .parse(function (args, opts) {
                expect(opts).to.have.property("custom1", false);
                expect(opts).to.have.property("custom2", false);
                expect(opts).to.have.property("custom3", false);
                expect(opts).to.have.property("custom4", false);
                expect(opts).to.have.property("custom5", false);
                expect(opts).to.have.property("custom6", true);
                expect(opts).to.have.property("custom7", true);
                expect(opts).to.have.property("custom8", true);
                expect(opts).to.have.property("custom9", true);
                done();
            }, [null, "program", "--custom-1=", "--custom-2=0", "--custom-3=no",
                "--custom-4=off", "--custom-5=false", "--custom-6=1",
                "--custom-7=yes", "--custom-8=on", "--custom-9=true"]);
    });

    it("Use boolean options as defaults", function (done) {
        new ProgramWrapper()
            .option("-A, --custom-1")
            .option("-B, --custom-2")
            .option("-C, --custom-3")
            .parse(function (args, opts) {
                expect(opts).to.have.property("custom1", false);
                expect(opts).to.have.property("custom2", false);
                expect(opts).to.have.property("custom3", false);
                done();
            }, [null, "program"]);
    });

});
