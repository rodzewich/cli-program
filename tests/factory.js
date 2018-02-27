var util = require("util"),
    ProgramWrapper = require("../build/index").ProgramWrapper,
    ProgramDeclaration = require("../build/index").ProgramDeclaration;

module.exports = function () {
    function Program() {}
    util.inherits(Program, ProgramWrapper);
    var declaration = new ProgramDeclaration();
    Program.prototype._getDeclaration = function () {
        return declaration;
    };
    return new Program();
};
