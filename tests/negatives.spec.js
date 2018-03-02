"use strict";
var fs = require("fs"),
    util = require("util"),
    expect = require("chai").expect;
require("./sourcemap");
var ProgramWrapper = require("../build/index-test").ProgramWrapper;

// TODO: check help description

describe("Negative options", function () {

    /*it("", function (done) {
        new ProgramWrapper()
            .option("-O, --option <string>", null, null, ["no"])
            .parse(function (args) {
                expect(args).to.have.property("requiredArgument1", "argument1");
                expect(args).to.have.property("requiredArgument2", "argument2");
                expect(args).to.have.property("optionalArgument", null);
                done();
            }, [null, "program", "--no-option"]);
    });*/

});