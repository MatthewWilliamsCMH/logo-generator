
const hexRegEx = /^([0-9a-f]{3}){1,2}$/i;

//validates hex number for text and icon color
function validateHex (hexColor) {
    hexLen = hexColor.length;
    if ((hexLen === 7 || hexLen === 4) && hexColor.charAt(0) === "#") {
        hexColor = hexColor.slice (1, hexLen);
    };
    if (hexRegEx.test (hexColor) === false) {
        return "Please supply a valid hexidecimal number in RRGGBB format.";
    };
    return true;
};

module.exports = validateHex;