const inquirer = require("inquirer");
const MaxLengthInputPrompt = require('inquirer-maxlength-input-prompt')
const fs = require("fs/promises");
const Circle = require("./lib/circle.js");
const Square = require("./lib/square.js");
const Triangle = require("./lib/triangle.js");
const colors = ["custom color", "red", "yellow", "green", "lime", "aqua", "blue", "cyan", "black", "white"]
const hexRegEx = /^([0-9a-f]{3}){1,2}$/i;

//validates hex number for text and icon color
function hexValidator (hexColor) {
    if (hexColor.length === 7 && hexColor.charAt(0) === "#") {
        hexColor = hexColor.slice(1,6)
    }
    if (hexRegEx.test(hexColor) === false) {
        return "Please supply a valid hexidecimal number in RRGGBB format.";
    }
    return true;
}

inquirer.registerPrompt('maxlength-input', MaxLengthInputPrompt)

inquirer
    .prompt([
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
            message: "Provide a filename"
            validate: ((fileName) => {
                if (fileName === "") {
                    return "You must supply a file name (do not include .svg)"
                }

                if (fileName.slice(-4) === ".svg") {
                    fileName = fileName(0,-4)
                }

            })
        }
    ])
    .then((results) => {
        if (results.hexTextColor !== "") {
            results.textColor = results.hexTextColor
        }
        if (results.hexIconColor !== "") {
            results.iconColor = results.hexIconColor
        }
        
        //tests 6-character long text (or icon) color value against hex regex; if it passes, "#" is 
        //appended to the beginning of the value. This prevents things like "purple" from acquiring a "#"
        if (results.textColor.length === 6 && hexRegEx.test(results.textColor)) {
            results.textColor = `#${results.textColor}`
        }
        if (results.iconColor.length === 6 && hexRegEx.test(results.iconColor)) {
            results.iconColor = `#${results.iconColor}`
        }

        const shapeMap = {
            circle: Circle,
            square: Square,
            triangle: Triangle
        };
    
        const ShapeClass = shapeMap[results.iconShape];
        const newShape = new ShapeClass (
            results.textStr,
            results.textColor,
            results.iconColor
        )
        const newSVG = newShape.printSVG();
        const fileName = results.fileName;

        fs.writeFile(`${fileName}.svg`, newSVG);
        console.log(`${fileName}.svg has been written to the hard drive.`)
    })    

    // const fs = require("fs");
// const inquirer = require("inquirer");
// //Commented this because this seems to have broken. Conflict with another library?
// // const MaxLengthInputPrompt = require('inquirer-maxlength-input-prompt')
// const Circle = require("./lib/circle.js")
// const Square = require("./lib/square.js")
// const Triangle = require("./lib/triangle.js")
// const colors = ["custom color", "red", "yellow", "green", "lime", "aqua", "blue", "cyan", "black", "white"]
// const hexRegEx = /^([0-9a-f]{3}){1,2}$/i

// function hexValidator (hexColor) {
//     if (hexColor.length === 7 && hexColor.charAt(0) === "#") {
//         hexColor = hexColor.slice(1,6)
//     }
//     if (hexRegEx.test(hexColor) === false) {
//         return "Please supply a valid hexidecimal number in RRGGBB format."
//     }
//     return true
// };
// //Writing my own validator because this seems to have broken. Conflict with another library?
// // inquirer.registerPrompt('maxlength-input', MaxLengthInputPrompt)
// inquirer
//     .prompt ([
//         {
//             // type: "maxlength-input", Commented this and inserted the line below because this seems to have broken. Conflict with another library?
//             type: "input",
//             // maxLength: 3, Commented this and inserted the line below because this seems to have broken. Conflict with another library?
//             name: "textStr",
//             message:"Provide up to 3 characters for your logo."
//             // validate: ((textStr) => {
//             //     if(textStr > 3) {
//             //         return "Too many characters!";
//             //     };
//             // })
//         },
//         {
//             type: "list",
//             name: "textColor",
//             message: "Choose a color for the text or type in your own hexidecimal color value.",
//             choices: colors
//         },
//         {
//             type: "input",
//             name: "textColor",
//             message: "What is the hex value of the color you want to use?",
//             when: (answers) => answers.textColor === "custom color",
//             validate: hexValidator
//         },
//         {
//             type: "list",
//             name: "iconShape",
//             message: "Choose a shape for your logo.",
//             choices: ["circle", "square", "triangle"]
//         },
//         {
//             type: "list",
//             name: "iconColor",
//             message: "Choose a color for your logo's icon or type in your own hexidecimal color value.",
//             choices: colors
//         },
//         {
//             type: "input",
//             name: "iconColor",
//             message: "What is the hex value of the color you want to use?",
//             when: (answers) => answers.iconColor === "custom color",
//             validate: hexValidator
//         },
//         {
//             type: "input",
//             name: "fileName",
//             message: "Provide a filename"
//             // validate: ((fileName) => {
//             //     if (fileName.slice(-4) === ".svg") {
//             //         fileName = fileName.slice(0, fileName.length-4);
//             //     };
//             // })
//         }
//     ])
//     .then((results) => {
//         //tests 6-character long text (or icon) color value against hex regex; if it passes, "#" is 
//         //appended to the beginning of the value. This prevents things like "purple" from acquiring a "#"
//         if (results.textColor.length === 6 && hexRegEx.test(results.textColor)) {
//             results.textColor = `#${results.textColor}`
//         }
//         if (results.iconColor.length === 6 && hexRegEx.test(results.iconColor)) {
//             results.iconColor = `#${results.iconColor}`
//         }

//         const shapeMap = {
//             circle: Circle,
//             square: Square,
//             triangle: Triangle
//         }
    
//         const ShapeClass = shapeMap[results.iconShape]
//         const newShape = new ShapeClass (
//             results.textStr,
//             results.textColor,
//             results.iconColor
//         )
//         const newSVG = newShape.printSVG()
//         const fileName = results.fileName

//         fs.writeFile(`${fileName}.svg`, newSVG)
//         console.log(`${fileName}.svg has been written to the hard drive.`)
//     })