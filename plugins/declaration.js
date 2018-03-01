var fs   = require("fs"),
    path = require("path");

var content = [
    ""
].join("\n");

function DeclarationPlugin(source, target) {
    if (!(this instanceof DeclarationPlugin)) {
        return new DeclarationPlugin(source, target);
    }
    this.source = source || null;
    this.target = target || null;
}
DeclarationPlugin.prototype.source = null;
DeclarationPlugin.prototype.target = null;
DeclarationPlugin.prototype.apply = function (compiler) {
    var COMMAND_FILENAME = path.join(this.source, "lib/ICommandWrapper.ts"),
        PROGRAM_FILENAME = path.join(this.source, "lib/IProgramWrapper.ts"),
        TARGET_FILENAME  = path.join(this.target, "index.d.ts");
    compiler.plugin("done", function () {
        var content = [];
        fs.readFile(
            COMMAND_FILENAME,
            {encoding: "utf8"},
            function (error, data) {
                if (error) {
                    console.log(error);
                    process.exit(0);
                }
                content.push(data.split("\n").filter(function (line) {
                    return line && line.indexOf("import") === -1;
                }).join("\n").replace("export ", ""));
                fs.readFile(
                    PROGRAM_FILENAME,
                    {encoding: "utf8"},
                    function (error, data) {
                        if (error) {
                            console.log(error);
                            process.exit(0);
                        }
                        content.push(data.split("\n").filter(function (line) {
                            return line && line.indexOf("import") === -1;
                        }).join("\n").replace("export ", ""));
                        content.push("declare const program: IProgramWrapper;");
                        content.push("export = program;");
                        fs.writeFile(
                            TARGET_FILENAME,
                            content.join("\n"),
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
            }
        );
    });
};

module.exports = DeclarationPlugin;