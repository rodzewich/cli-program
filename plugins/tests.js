var path = require("path"),
    cp = require("child_process");

function TestsPlugin(source) {
    if (!(this instanceof TestsPlugin)) {
        return new TestsPlugin(source);
    }
    this.source = source || null;
}
TestsPlugin.prototype.source = null;
TestsPlugin.prototype.apply = function (compiler) {
    var MOCHA_FILENAME = path.join(this.source, "node_modules/.bin/mocha");
    compiler.plugin("done", function () {
        var tests = cp.spawn(MOCHA_FILENAME, ["tests/**/**.spec.js", "--color=always"]);
        tests.stdout.on("data", function (data) {
            process.stdout.write(data);
        });
        tests.stderr.on("data", function (data) {
            process.stderr.write(data);
        });
    });
};

module.exports = TestsPlugin;