const inquirer = require("inquirer");
const MaxLengthInputPrompt = require('inquirer-maxlength-input-prompt');
const fs = require("fs/promises");
const Circle = require("./lib/circle.js");
const Square = require("./lib/square.js");
const Triangle = require("./lib/triangle.js");
const colors = ["custom color", "red", "yellow", "green", "lime", "aqua", "blue", "cyan", "black", "white"];
const hexRegEx = /^([0-9a-f]{3}){1,2}$/i;

//validates hex number for text and icon color
function hexValidator (hexColor) {
    if (hexColor.length === 7 && hexColor.charAt[0] === "#") {
        hexColor = hexColor.slice (1,6);
    };
    if (hexRegEx.test (hexColor) === false) {
        return "Please supply a valid hexidecimal number in RRGGBB format.";
    };
    return true;
};

inquirer.registerPrompt ('maxlength-input', MaxLengthInputPrompt);

inquirer
    .prompt ([
        {
            type: "maxlength-input",
            maxLength: 3,
            name: "textStr",
            message:"Provide up to 3 characters for your logo.",
        },
        {
            type: "list",
            name: "textColor",
            message: "Choose a color for the text or type in your own hexidecimal color value.",
            choices: colors
        },
        {
            type: "input",
            name: "hexTextColor",
            message: "What is the hex value of the color you want to use?",
            when: (answers) => answers.textColor === "custom color",
            validate: hexValidator
        },
        {
            type: "list",
            name: "iconShape",
            message: "Choose a shape for your logo.",
            choices: ["circle", "square", "triangle"]
        },
        {
            type: "list",
            name: "iconColor",
            message: "Choose a color for your logo's icon or type in your own hexidecimal color value.",
            choices: colors
        },
        {
            type: "input",
            name: "hexIconColor",
            message: "What is the hex value of the color you want to use?",
            when: (answers) => answers.iconColor === "custom color",
            validate: hexValidator
        },
        {
            type: "input",
            name: "fileName",
            message: "Provide a filename",
            validate: ((fileName) => {
                if (fileName === "") {
                    return "You must supply a file name (do not include .svg)"
                }
                if (fileName.slice (-4) === ".svg") {
                    fileName = fileName.slice (0, -4)
                }
                return true
            })
        }
    ])
    .then ((results) => {
        //reassigns text (or icon) color to hex value if one has been provided
        if (results.hexTextColor !== undefined && hexRegEx.test (results.hexTextColor)) {
            results.textColor = results.hexTextColor
        };
        if (results.hexIconColor !== undefined && hexRegEx.test (results.hexIconColor)) {
            results.iconColor = results.hexIconColor
        };
        //tests 6-character long text (or icon) color value against hex regex; if it passes, "#" is 
        //appended to the beginning of the value. This prevents things like "purple" from acquiring a "#"
        if (results.textColor.length === 6 && hexRegEx.test (results.textColor)) {
            results.textColor = `#${results.textColor}`
        };
        if (results.iconColor.length === 6 && hexRegEx.test (results.iconColor)) {
            results.iconColor = `#${results.iconColor}`
        };

        // assigns shapes to an object then calls the correct shape class from that object
        const shapeMap = {
            circle: Circle,
            square: Square,
            triangle: Triangle
        };
        const ShapeClass = shapeMap [results.iconShape];
        const newShape = new ShapeClass (
            results.textStr,
            results.textColor,
            results.iconColor
        );

        //generates svg text from the [shape]'s.printSVG function
        const newSVG = newShape.printSVG ();

        //assigns filename and writes data from printSVG to that file
        const fileName = results.fileName;
        fs.writeFile (`${fileName}.svg`, newSVG);
        console.log (`${fileName}.svg has been written to the hard drive.`);
    });