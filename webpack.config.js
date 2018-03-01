"use strict";

var fs = require("fs"),
    path = require("path"),
    UglifyJsPlugin = require("webpack").optimize.UglifyJsPlugin,
    NodeExternals  = require('webpack-node-externals'),
    SOURCE_DIRECTORY = __dirname,
    TARGET_DIRECTORY = path.join(SOURCE_DIRECTORY, "build"),
    PackagePlugin = require("./plugins/package"),
    DeclarationPlugin = require("./plugins/declaration"),
    LicensePlugin = require("./plugins/license"),
    ReadmePlugin = require("./plugins/readme"),
    TestsPlugin = require("./plugins/tests");

module.exports = [
    {
        context: __dirname,
        entry: {
            "index": path.join(SOURCE_DIRECTORY, "lib/index.ts")
        },
        output  : {
            filename          : "./index.js",
            sourceMapFilename : "./index.js.map",
            libraryTarget     : "commonjs2",
            path : TARGET_DIRECTORY
        },
        target  : 'node',
        devtool : "sourcemap",
        plugins : [
            new UglifyJsPlugin({
                parallel  : true,
                sourceMap : true
            }),
            new PackagePlugin(SOURCE_DIRECTORY, TARGET_DIRECTORY),
            new DeclarationPlugin(SOURCE_DIRECTORY, TARGET_DIRECTORY),
            new LicensePlugin(SOURCE_DIRECTORY, TARGET_DIRECTORY),
            new ReadmePlugin(SOURCE_DIRECTORY, TARGET_DIRECTORY),
            new TestsPlugin(SOURCE_DIRECTORY)
        ],
        externals : [NodeExternals()],
        module  : {
            loaders : [
                {
                    test   : /\.tsx?$/i,
                    loader : "babel-loader?{\"sourceMaps\":true,\"plugins\":[[\"transform-strict-mode\",{\"strict\":true}],[\"transform-es3-member-expression-literals\"],[\"transform-es3-property-literals\"],[\"transform-es5-property-mutators\"],[\"transform-class-properties\"],[\"check-es2015-constants\"],[\"transform-es2015-template-literals\",{\"loose\":false,\"spec\":false}],[\"transform-es2015-literals\"],[\"transform-es2015-function-name\"],[\"transform-es2015-arrow-functions\",{\"spec\":false}],[\"transform-es2015-block-scoped-functions\"],[\"transform-es2015-classes\",{\"loose\":false}],[\"transform-es2015-object-super\"],[\"transform-es2015-shorthand-properties\"],[\"transform-es2015-duplicate-keys\"],[\"transform-es2015-computed-properties\",{\"loose\":false}],[\"transform-es2015-for-of\",{\"loose\":false}],[\"transform-es2015-sticky-regex\"],[\"transform-es2015-unicode-regex\"],[\"check-es2015-constants\"],[\"transform-es2015-spread\",{\"loose\":false}],[\"transform-es2015-parameters\"],[\"transform-es2015-destructuring\",{\"loose\":false}],[\"transform-es2015-block-scoping\"],[\"transform-es2015-typeof-symbol\"],[\"transform-es2015-modules-commonjs\",{\"loose\":false}],[\"transform-exponentiation-operator\"],[\"syntax-trailing-function-commas\"],[\"transform-async-to-module-method\",{\"module\":\"bluebird\",\"method\":\"coroutine\"}],[\"transform-async-generator-functions\"],[\"transform-regenerator\",{\"async\":true,\"generators\":true,\"asyncGenerators\":true}],[\"transform-do-expressions\"],[\"transform-function-bind\"],[\"transform-class-constructor-call\"],[\"transform-export-extensions\"],[\"syntax-dynamic-import\"],[\"transform-decorators\"],[\"transform-object-rest-spread\"],[\"transform-flow-strip-types\"],[\"transform-flow-comments\"],[\"syntax-jsx\"],[\"transform-react-jsx\"],[\"transform-react-jsx-source\"],[\"transform-react-jsx-self\"],[\"transform-react-jsx-compat\"],[\"transform-react-inline-elements\"],[\"transform-react-constant-elements\"],[\"transform-react-display-name\"],[\"transform-eval\"],[\"transform-jscript\"]]}!ts-loader?{\"transpileOnly\":false,\"happyPackMode\":false,\"getCustomTransformers\":null,\"logInfoToStdOut\":false,\"logLevel\":\"warn\",\"silent\":false,\"ignoreDiagnostics\":[],\"compiler\":\"typescript\",\"configFile\":\"/home/rodzewich/Projects/obcomm/tsconfig.json\",\"visualStudioErrorFormat\":false,\"compilerOptions\":{},\"instance\":null,\"entryFileIsJs\":false,\"appendTsSuffixTo\":[],\"appendTsxSuffixTo\":[]}"
                }
            ]
        }
    },
    {
        context: __dirname,
        entry: {
            "index-test": path.join(SOURCE_DIRECTORY, "lib/index-test.ts")
        },
        output  : {
            filename          : "./index-test.js",
            sourceMapFilename : "./index-test.js.map",
            libraryTarget     : "commonjs2",
            path : TARGET_DIRECTORY
        },
        target  : 'node',
        devtool : "sourcemap",
        plugins : [
            new UglifyJsPlugin({
                parallel  : true,
                sourceMap : true
            })
        ],
        externals : [NodeExternals()],
        module  : {
            loaders : [
                {
                    test   : /\.tsx?$/i,
                    loader : "babel-loader?{\"sourceMaps\":true,\"plugins\":[[\"transform-strict-mode\",{\"strict\":true}],[\"transform-es3-member-expression-literals\"],[\"transform-es3-property-literals\"],[\"transform-es5-property-mutators\"],[\"transform-class-properties\"],[\"check-es2015-constants\"],[\"transform-es2015-template-literals\",{\"loose\":false,\"spec\":false}],[\"transform-es2015-literals\"],[\"transform-es2015-function-name\"],[\"transform-es2015-arrow-functions\",{\"spec\":false}],[\"transform-es2015-block-scoped-functions\"],[\"transform-es2015-classes\",{\"loose\":false}],[\"transform-es2015-object-super\"],[\"transform-es2015-shorthand-properties\"],[\"transform-es2015-duplicate-keys\"],[\"transform-es2015-computed-properties\",{\"loose\":false}],[\"transform-es2015-for-of\",{\"loose\":false}],[\"transform-es2015-sticky-regex\"],[\"transform-es2015-unicode-regex\"],[\"check-es2015-constants\"],[\"transform-es2015-spread\",{\"loose\":false}],[\"transform-es2015-parameters\"],[\"transform-es2015-destructuring\",{\"loose\":false}],[\"transform-es2015-block-scoping\"],[\"transform-es2015-typeof-symbol\"],[\"transform-es2015-modules-commonjs\",{\"loose\":false}],[\"transform-exponentiation-operator\"],[\"syntax-trailing-function-commas\"],[\"transform-async-to-module-method\",{\"module\":\"bluebird\",\"method\":\"coroutine\"}],[\"transform-async-generator-functions\"],[\"transform-regenerator\",{\"async\":true,\"generators\":true,\"asyncGenerators\":true}],[\"transform-do-expressions\"],[\"transform-function-bind\"],[\"transform-class-constructor-call\"],[\"transform-export-extensions\"],[\"syntax-dynamic-import\"],[\"transform-decorators\"],[\"transform-object-rest-spread\"],[\"transform-flow-strip-types\"],[\"transform-flow-comments\"],[\"syntax-jsx\"],[\"transform-react-jsx\"],[\"transform-react-jsx-source\"],[\"transform-react-jsx-self\"],[\"transform-react-jsx-compat\"],[\"transform-react-inline-elements\"],[\"transform-react-constant-elements\"],[\"transform-react-display-name\"],[\"transform-eval\"],[\"transform-jscript\"]]}!ts-loader?{\"transpileOnly\":false,\"happyPackMode\":false,\"getCustomTransformers\":null,\"logInfoToStdOut\":false,\"logLevel\":\"warn\",\"silent\":false,\"ignoreDiagnostics\":[],\"compiler\":\"typescript\",\"configFile\":\"/home/rodzewich/Projects/obcomm/tsconfig.json\",\"visualStudioErrorFormat\":false,\"compilerOptions\":{},\"instance\":null,\"entryFileIsJs\":false,\"appendTsSuffixTo\":[],\"appendTsxSuffixTo\":[]}"
                }
            ]
        }
    }
];
