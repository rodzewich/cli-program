var fs = require("fs"),
    path = require("path"),
    FILENAME = path.join(__dirname, "package.json");

fs.readFile(
    FILENAME,
    {encoding: "utf8"},
    function (error, content) {
        var info;
        if (error) {
            console.log(error);
            process.exit(1);
        }
        info = JSON.parse(content);
        info.version = String(info.version || "").replace(/\.(\d+)$/, function (match, minor) {
            return "."  + String((parseInt(minor, 10) || 0) + 1);

        });
        fs.writeFile(
            FILENAME,
            JSON.stringify(info, null, 2),
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