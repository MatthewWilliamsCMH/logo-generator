const validateHex = require("./hexvalidator")

// A testing suite for Arithmetic is created.
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