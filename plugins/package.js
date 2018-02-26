var fs   = require("fs"),
    path = require("path");

function PackagePlugin(source, target) {
    if (!(this instanceof PackagePlugin)) {
        return new PackagePlugin(source, target);
    }
    this.source = source || null;
    this.target = target || null;
}
PackagePlugin.prototype.source = null;
PackagePlugin.prototype.target = null;
PackagePlugin.prototype.apply = function (compiler) {
    var SOURCE_FILENAME = path.join(this.source, "package.json");
    var TARGET_FILENAME = path.join(this.target, "package.json");
    compiler.plugin("done", function () {
        fs.readFile(
            SOURCE_FILENAME,
            {encoding: "utf8"},
            function (error, content) {
                if (error) {
                    console.log(error);
                    process.exit(1);
                }
                var data = Object
                    .keys(JSON.parse(content))
                    .reduce(function (accumulator, key) {
                        if (["name", "version", "license", "dependencies", "email"].indexOf(key) !== -1) {
                            accumulator[key] = JSON.parse(content)[key]
                        }
                        return accumulator;
                    }, {});
                fs.writeFile(
                    TARGET_FILENAME,
                    JSON.stringify(data, null, 2),
                    {encoding: "utf8"},
                    function (error) {
                        if (error) {
                            console.log(error);
                            process.exit(1);
                        }
                    }
                );
            }
        );
    });
};

module.exports = PackagePlugin;