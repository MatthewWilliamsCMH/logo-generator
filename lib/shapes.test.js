const validateHex = require("./hexvalidator");
const Circle = require("./circle.js");
let circle = new Circle
const Square = require("./square.js");
let square = new Square
const Triangle = require("./triangle.js");
let triangle = new Triangle

// ---------- hexvalidator.js ---------- //
describe ("Hexidecimal", () => {
    it ("should take ensure that hex numbers are three or six characters long and only contain 0-9A-F (case indepenent)", () => {
      expect (validateHex ("aaa")).toEqual (true);
    });
    it ("should take ensure that hex numbers are three or six characters long and only contain 0-9A-F (case indepenent)", () => {
      expect (validateHex ("#aaa")).toEqual (true);
    });
    it ("should take ensure that hex numbers are three or six characters long and only contain 0-9A-F (case indepenent)", () => {
      expect (validateHex ("aabbcc")).toEqual (true);
    });
    it ("should take ensure that hex numbers are three or six characters long and only contain 0-9A-F (case indepenent)", () => {
      expect (validateHex ("#aabbcc")).toEqual (true);
    });
    it ("should take ensure that hex numbers are three or six characters long and only contain 0-9A-F (case indepenent)", () => {
      expect (validateHex ("aabbccdd")).toEqual ("Please supply a valid hexidecimal number in RRGGBB format.");
    });
    it ("should take ensure that hex numbers are three or six characters long and only contain 0-9A-F (case indepenent)", () => {
      expect (validateHex ("#aabbc")).toEqual ("Please supply a valid hexidecimal number in RRGGBB format.");
    });
    it ("should take ensure that hex numbers are three or six characters long and only contain 0-9A-F (case indepenent)", () => {
      expect (validateHex ("aa")).toEqual ("Please supply a valid hexidecimal number in RRGGBB format.");
    });
    it ("should take ensure that hex numbers are three or six characters long and only contain 0-9A-F (case indepenent)", () => {
      expect (validateHex ("yellow")).toEqual ("Please supply a valid hexidecimal number in RRGGBB format.");
    });
});

// ---------- circle.js ---------- //
describe ("Circle", () => {
  test ("should return a complete string of SVG code", () => {
    const circle = new Circle (
      "!~!",
      "blue",
      "red",
      "200",
      "150",
      "90",
      "50%",
      "210",
      "middle",
      "180",
      "Arial",
      "italic"
    )
    const newSVG = circle.printSVG ();

    expect (newSVG).toEqual (`<svg width = "400" height = "300" xmlns="http://www.w3.org/2000/svg">
<rect x = "50" y = "50" width = "300" height = "200" fill = "#eee" />
<circle cx = "${circle.cx}" cy = "${circle.cy}" r = "${circle.radius}" fill = "${circle.iconColor}" />
<text x = "${circle.textX}" y = "${circle.textY}" text-anchor = "${circle.textAnchor}" font-size = "${circle.fontSize}" font-family = "${circle.fontFamily}" font-style = "${circle.fontStyle}" fill = "${circle.textColor}">${circle.textStr}</text>
</svg>`)
    });
  test ("should return an incomplete string of SVG code", () => {
      const circle = new Circle (
        "200",
        "150",
        "90",
        "50%",
        "210",
        "middle",
        "180",
        "Arial",
        "Italic"
      )
      const newSVG = circle.printSVG ();
  
      expect (newSVG).not.toEqual (`<svg width = "400" height = "300" xmlns="http://www.w3.org/2000/svg">
<rect x = "50" y = "50" width = "300" height = "200" fill = "#eee" />
<circle cx = "200" cy = "150" r = "90" fill = "red" />
<text x = "50%" y = "210" text-anchor = "middle" font-size = "180" font-family = "Arial" font-style = "italic" fill = "blue">!~!</text>
</svg>`)
      });
  
});

// ---------- square.js ---------- //
describe ("Square", () => {
  test ("should return a complete string of SVG code", () => {
    const square = new Square (
      "!~!",
      "blue",
      "red",
      "110",
      "60",
      "180",
      "180",
      "50%",
      "220",
      "middle",
      "180",
      "Arial",
      "italic"
    )
    const newSVG = square.printSVG ();

    expect (newSVG).toEqual (`<svg width = "400" height = "300" xmlns="http://www.w3.org/2000/svg">
<rect x = "50" y = "50" width = "300" height = "200" fill = "#eee" />
<rect x = "${square.x}" y = "${square.y}" width = "${square.width}" height = "${square.height}" fill = "${square.iconColor}" />
<text x = "${square.textX}" y = "${square.textY}" text-anchor = "${square.textAnchor}" font-size = "${square.fontSize}" font-family = "${square.fontFamily}" font-style = "${square.fontStyle}" fill = "${square.textColor}">${square.textStr}</text>
</svg>`)
    });
  test ("should return an incomplete string of SVG code", () => {
    const square = new Square (
      "110",
      "60",
      "180",
      "180",
      "50%",
      "220",
      "middle",
      "180",
      "Arial",
      "italic"
    )
    const newSVG = square.printSVG ();

    expect (newSVG).not.toEqual (`<svg width = "400" height = "300" xmlns="http://www.w3.org/2000/svg">
<rect x = "50" y = "50" width = "300" height = "200" fill = "#eee" />
<rect x = "110" y = "60" width = "180" height = "180" fill = "${square.iconColor}" />
<text x = "50%" y = "220" text-anchor = "middle" font-size = "180" font-family = "Arial" font-style = "Italic" fill = "${square.textColor}">${square.textStr}</text>
</svg>`)
    });

    // ---------- triangle.js ---------- //
describe ("Triangle", () => {
  test ("should return a complete string of SVG code", () => {
    const triangle = new Triangle (
      "!~!",
      "blue",
      "red",
      "110",
      "60",
      "100,60 100,240 300,150",
      "40%",
      "185",
      "middle",
      "90",
      "Arial",
      "italic"
    )
    const newSVG = triangle.printSVG ();

    expect (newSVG).toEqual (`<svg width = "400" height = "300" xmlns="http://www.w3.org/2000/svg">
<rect x = "50" y = "50" width = "300" height = "200" fill = "#eee" />
<polygon x = "${triangle.x}" y = "${triangle.y}" points = "${triangle.points}" fill = "${triangle.iconColor}" />
<text x = "${triangle.textX}" y = "${triangle.textY}" text-anchor = "${triangle.textAnchor}" font-size = "${triangle.fontSize}" font-family = "${triangle.fontFamily}" font-style = "${triangle.fontStyle}" fill = "${triangle.textColor}">${triangle.textStr}</text>
</svg>`)
    });
  });
  describe ("Triangle", () => {
    test ("should return an incomplete string of SVG code", () => {
      const triangle = new Triangle (
        "110",
        "60",
        "100,60 100,240 300,150",
        "40%",
        "185",
        "middle",
        "90",
        "Arial",
        "italic"
      )
      const newSVG = triangle.printSVG ();
  
      expect (newSVG).not.toEqual (`<svg width = "400" height = "300" xmlns="http://www.w3.org/2000/svg">
  <rect x = "50" y = "50" width = "300" height = "200" fill = "#eee" />
  <polygon x = "${triangle.x}" y = "${triangle.y}" points = "${triangle.points}" fill = "${triangle.iconColor}" />
  <text x = "${triangle.textX}" y = "${triangle.textY}" text-anchor = "${triangle.textAnchor}" font-size = "${triangle.fontSize}" font-family = "${triangle.fontFamily}" font-style = "${triangle.fontStyle}" fill = "${triangle.textColor}">${triangle.textStr}</text>
  </svg>`)
      });
    });
  });

this.x = "110",
this.y = "60",
this.points = "100,60 100,240, 300,150",
this.textX = "40%",
this.textY = "185",
this.textAnchor = "middle",
this.fontSize = "90",
this.fontFamily = "Arial",
this.fontStyle = "italic"