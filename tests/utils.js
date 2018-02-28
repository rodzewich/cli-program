
function cleanColors(str) {
    return String(str || "").replace(/\x1b\[[^m]+m/gi, "");
}

module.exports = {
    cleanColors: cleanColors
};