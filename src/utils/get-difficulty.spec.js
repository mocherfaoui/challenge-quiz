import { getDifficulty } from "./get-difficulty";

it("should return a number for every case", () => {
  expect(getDifficulty("easy")).toBe(1);
  expect(getDifficulty("medium")).toBe(2);
  expect(getDifficulty("hard")).toBe(3);
});

it("should throw an error", () => {
  expect(() => {
    getDifficulty("random");
  }).toThrow();
});
