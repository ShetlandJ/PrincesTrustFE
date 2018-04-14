var util = require('../helpers/util')

//util.getMonthName()
test('getMonthName(): can get month name from number', () => {
  expect(util.getMonthName(1)).toBe("January");
});

test('getMonthName(): will return an error message if the month number is not within 1-12', () => {
  expect(util.getMonthName(0)).toBe("That is not a valid month number. Input must be between 0 and 13");
});

test('getMonthName(): will return an error message if the input is not a number', () => {
  expect(util.getMonthName("One")).toBe("That is not a valid month number. Input must be between 0 and 13");
  expect(util.getMonthName(["one"])).toBe("That is not a valid month number. Input must be between 0 and 13");
  expect(util.getMonthName({"One": "one"})).toBe("That is not a valid month number. Input must be between 0 and 13");
});

//util.getMonthNumber()
test('getMonthNumber(): can get month number from name', () => {
  expect(util.getMonthNumber("January")).toBe(1);
});
