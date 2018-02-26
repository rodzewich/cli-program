var fs   = require("fs"),
    path = require("path");

function LicensePlugin(source, target) {
    if (!(this instanceof LicensePlugin)) {
        return new LicensePlugin(source, target);
    }
    this.source = source || null;
    this.target = target || null;
}
LicensePlugin.prototype.source = null;
LicensePlugin.prototype.target = null;
LicensePlugin.prototype.apply = function (compiler) {
    var SOURCE_FILENAME = path.join(this.source, "LICENSE");
    var TARGET_FILENAME = path.join(this.target, "LICENSE");
    compiler.plugin("done", function () {
        fs.readFile(
            SOURCE_FILENAME,
            {encoding: "utf8"},
            function (error, content) {
                if (error) {
                    console.log(error);
                    process.exit(1);
                }
                fs.writeFile(
                    TARGET_FILENAME,
                    content,
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

module.exports = LicensePlugin;