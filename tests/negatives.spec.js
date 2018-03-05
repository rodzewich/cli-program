"use strict";
var fs = require("fs"),
    util = require("util"),
    expect = require("chai").expect;
require("./sourcemap");
var ProgramWrapper = require("../build/index-test").ProgramWrapper;

// TODO: check help description

describe("Negative options", function () {

    it("", function (done) {
        new ProgramWrapper()
            .option("-O, --option <string>", null, null, ["no"])
            .parse(function (args, opts) {
                expect(opts).to.have.property("option", false);
                done();
            }, [null, "program", "--no-option"]);
    });

});