const Index = require("../index.js")

// A testing suite for Arithmetic is created.
describe('Index', () => {
  describe("Hexidecimal", () => {
    it("should take ensure that hex numbers are three or six characters long and only contain 0-9A-F (case indepenent)", () => {
      const hex = "#fff";
      const result = new Index.hexValidator(hex);
      expect(result).toEqual(true);
    });
  });
});
// // Constructor Arithmetic is imported.
// const Arithmetic = require('../arithmetic.js');

// // A testing suite for Arithmetic is created.
// describe('Arithmetic', () => {
//   // A test is created to check that modulus does in fact return the remainder of the quotient of the two numbers.
//   describe('modulus', () => {
//     it('should take two numbers, divide them, and return the remainder', () => {
//       const total = 0;
//       const arithmetic = new Arithmetic();
//       expect(arithmetic.modulus(2, 2)).toEqual(total);
//     });
//   });
// });
