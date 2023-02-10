import { getMaxScore } from "./score-calculation";


it("should return max score based on wrong answers and total questions", () => {
  expect(getMaxScore(10, 20)).toBe(50);
});
