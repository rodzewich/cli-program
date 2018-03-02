var fs   = require("fs"),
    path = require("path"),
    glob = require("glob");

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
    var SOURCE_FILENAME = path.join(this.source, "README.md"),
        TARGET_FILENAME = path.join(this.target, "README.md"),
        EXAMPLES_DIRECTORY = path.join(this.source, "examples");
    compiler.plugin("done", function () {
        const examplesContent = [];
        glob("*.js", {cwd : EXAMPLES_DIRECTORY}, function (error, files) {
            if (error) {
                console.log(error);
                process.exit(1);
            }
            Promise
                .all(files.map(function (filename) {
                    return new Promise(function (resolve) {
                        fs.readFile(
                            path.join(EXAMPLES_DIRECTORY, filename),
                            {encoding: "utf8"},
                            function (error, content) {
                                if (error) {
                                    console.log(error);
                                    process.exit(1);
                                }
                                examplesContent.push("### " + filename);
                                examplesContent.push("```js");
                                examplesContent.push(content);
                                examplesContent.push("```");
                                examplesContent.push("");
                                resolve();
                            }
                        );
                    });
                }))
                .then(function () {
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
                                content.replace("## Examples", "## Examples\n\n" + examplesContent.join("\n")),
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
        });
    });
};

module.exports = LicensePlugin;