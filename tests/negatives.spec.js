"use strict";
var fs = require("fs"),
    util = require("util"),
    expect = require("chai").expect;
require("./sourcemap");
var ProgramWrapper = require("../build/index-test").ProgramWrapper;

// TODO: check help description

describe("Negative options", function () {

    it("Use negative option", function (done) {
        new ProgramWrapper()
            .option("-O, --option <string>", null, null, ["no"])
            .parse(function (args, opts) {
                expect(opts).to.have.property("option", false);
                done();
            }, [null, "program", "--no-option"]);
    });

    it("Use negative option defined as camelCame", function (done) {
        new ProgramWrapper()
            .option("-O, --option <string>", null, null, ["without-test"])
            .parse(function (args, opts) {
                expect(opts).to.have.property("option", false);
                done();
            }, [null, "program", "--withoutTestOption"]);
    });

    it("Use negative option defined as snakeCame", function (done) {
        new ProgramWrapper()
            .option("-O, --option <string>", null, null, ["without-test"])
            .parse(function (args, opts) {
                expect(opts).to.have.property("option", false);
                done();
            }, [null, "program", "--without_test_option"]);
    });

    it("Use negative option defined as kebabCame", function (done) {
        new ProgramWrapper()
            .option("-O, --option <string>", null, null, ["without-test"])
            .parse(function (args, opts) {
                expect(opts).to.have.property("option", false);
                done();
            }, [null, "program", "--without-test-option"]);
    });


    it("Use negative option declared as camelCame", function (done) {
        new ProgramWrapper()
            .option("-O, --option <string>", null, null, ["withoutTest"])
            .parse(function (args, opts) {
                expect(opts).to.have.property("option", false);
                done();
            }, [null, "program", "--without-test-option"]);
    });

    it("Use negative option declared as snakeCame", function (done) {
        new ProgramWrapper()
            .option("-O, --option <string>", null, null, ["without_test"])
            .parse(function (args, opts) {
                expect(opts).to.have.property("option", false);
                done();
            }, [null, "program", "--without-test-option"]);
    });

    it("Use negative option declared as kebabCame", function (done) {
        new ProgramWrapper()
            .option("-O, --option <string>", null, null, ["without-test"])
            .parse(function (args, opts) {
                expect(opts).to.have.property("option", false);
                done();
            }, [null, "program", "--without-test-option"]);
    });

});
