const { isHoliday, isWeekend } = require("./AvailableTablesPage");

test("isHoliday() returns true for 7-4-2021", () => {
  expect(isHoliday(new Date(2021, 6, 4))).toBe(true);
});

test("isHoliday() returns true for 7-4-2022", () => {
  expect(isHoliday(new Date(2022, 6, 4))).toBe(true);
});

test("isHoliday() returns true for 2-14-2021", () => {
  expect(isHoliday(new Date(2021, 1, 14))).toBe(true);
});

test("isHoliday() returns false for 2-13-2021", () => {
  expect(isHoliday(new Date(2021, 1, 13))).toBe(false);
});

test("isHoliday() returns true for 3-17-2021", () => {
  expect(isHoliday(new Date(2021, 2, 17))).toBe(true);
});

test("isHoliday() returns true for 12-25-2021", () => {
  expect(isHoliday(new Date(2021, 11, 25))).toBe(true);
});

test("isWeekend() returns true for 12-25-2021", () => {
  expect(isWeekend(new Date(2021, 11, 25))).toBe(true);
});

test("isWeekend() returns false for 12-24-2021", () => {
  expect(isWeekend(new Date(2021, 11, 24))).toBe(false);
});
