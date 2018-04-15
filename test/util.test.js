var util = require('../helpers/util')

//util.getMonthName()
test('getMonthName(): can get month name from number', () => {
  expect(util.getMonthName(1)).toBe("January");
});

test('getMonthName(): will return an error message if the month number is not within 1-12', () => {
  expect(util.getMonthName(0)).toBe("That is not a valid month number. Input must be between 0 and 13");
});

test('getMonthName(): will return an error message if the input is not a number', () => {
  var expected = "That is not a valid month number. Input must be between 0 and 13"
  expect(util.getMonthName("One")).toBe(expected);
  expect(util.getMonthName(["one"])).toBe(expected);
  expect(util.getMonthName({number: "one"})).toBe(expected);
});

//util.getMonthNumber()
test('getMonthNumber(): can get month number from name', () => {
  expect(util.getMonthNumber("January")).toBe(1);
});

test('getMonthNumber(): will return an error message if the month number is not within 1-12', () => {
  var expected = "That's not a correct month name. The following are valid month names: January,February,March,April,May,June,July,August,September,October,November,December"
  expect(util.getMonthNumber("Smarch")).toBe(expected);
});

test('getMonthName(): will return an error message if the input is not a number', () => {
  var expected = "That's not a correct month name. The following are valid month names: January,February,March,April,May,June,July,August,September,October,November,December"

  expect(util.getMonthNumber("Jan")).toBe(expected);
  expect(util.getMonthNumber(["January"])).toBe(expected);
  expect(util.getMonthNumber({month: "January"})).toBe(expected);
});

//util.getDaysInMonth()
test('getDaysInMonth(): can get the days in a month', () => {
  var january = util.getDaysInMonth(2018, 0)
  var februaryLeap = util.getDaysInMonth(2016, 1)

  expect(january.length).toBe(31);
  expect(februaryLeap.length).toBe(29);
});

test('getDaysInMonth(): will return zero days if the year does not exist', () => {
  var wrongYearExample = util.getDaysInMonth("String", 0)

  expect(wrongYearExample.length).toBe(0);
});

test('getDaysInMonth(): will return zero days if the month does not exist', () => {
  var wrongMonthExample = util.getDaysInMonth(2018, 13)

  expect(wrongMonthExample.length).toBe(0);
});
