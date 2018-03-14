var path = require("path"),
    cp = require("pty.js");

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
        var tests = cp.spawn(MOCHA_FILENAME, ["tests/**/**.spec.js", "--color=always"]),
            columns = process.stdout.columns,
            rows = process.stdout.rows;
        tests.resize(columns, rows);
        tests.on("data", function (data) {
            process.stdout.write(data);
        });
        process.on("resize", function () {
            var columns = process.stdout.columns,
                rows = process.stdout.rows;
            tests.resize(columns, rows);
        });
    });
};

module.exports = TestsPlugin;