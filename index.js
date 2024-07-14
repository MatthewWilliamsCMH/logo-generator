const inquirer = require("inquirer");
const MaxLengthInputPrompt = require('inquirer-maxlength-input-prompt');
const fs = require("fs/promises");
const validateHex = require("./lib/hexvalidator")
const Circle = require("./lib/circle.js");
const Square = require("./lib/square.js");
const Triangle = require("./lib/triangle.js");
const colors = ["custom color", "red", "yellow", "green", "lime", "aqua", "blue", "cyan", "black", "white"];
const hexRegEx = /^([0-9a-f]{3}){1,2}$/i;

//gather user data
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
            validate: validateHex
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
            validate: validateHex
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