import { getRating } from "../utils/get-rating";

it("should return a number for every case", () => {
  expect(getRating("easy")).toBe(1);
  expect(getRating("medium")).toBe(2);
  expect(getRating("hard")).toBe(3);
});

it("should throw an error", () => {
  expect(() => {
    getRating("random");
  }).toThrow();
});
