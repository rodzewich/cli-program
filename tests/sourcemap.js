var fs = require("fs");

require('source-map-support')
    .install({
        retrieveSourceMap: function(source) {
            if (source.substr(-3).toLowerCase() === ".js" &&
                fs.existsSync(source + ".map")) {
                return {
                    map : fs.readFileSync(source + ".map", "utf8")
                };
            }
            return null;
        }
    });
