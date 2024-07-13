const Shape = require("./shape.js");

class Square extends Shape {
    constructor(textStr, textColor, iconColor) {
        super(textStr, textColor, iconColor);
        //Saving the following fixed values as part of the object is unnecessary, but I'm doing so to practice adding properties to an object and writing string literals.
        this.x = "110",
        this.y = "60",
        this.width = "180",
        this.height = "180",
        this.textX = "50%",
        this.textY = "220",
        this.textAnchor = "middle",
        this.fontSize = "180",
        this.fontFamily = "Arial",
        this.fontStyle = "italic"
    }

    //This function will vary depending on the shape, which is why we need three shape classes plus the Shapes class.
    //I shaded the rectangle so that it's easier to verify size if the user chooses a white background.
    printSVG() {
        return `<svg width = "400" height = "300" xmlns="http://www.w3.org/2000/svg">  
        <rect x = "50" y = "50" width = "300" height = "200" fill = "#eee" />
        <rect x = "${this.x}" y = "${this.y}" width = "${this.width}" height = "${this.height}" fill = "${this.iconColor}" />
        <text x = "${this.textX}" y = "${this.textY}" text-anchor = "${this.textAnchor}" font-size = "${this.fontSize}" font-family = "${this.fontFamily}" font-style = "${this.fontStyle}" fill = "${this.textColor}">${this.textStr}</text>
</svg>` //This line is flush left only so that the output file will be indented correctly.

    }
}

module.exports = Square;