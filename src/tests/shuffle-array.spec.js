import { shuffleArray } from "../utils/shuffle-array";

const answers = [
  "Homo Ergaster",
  "Homo Erectus",
  "Homo Neanderthalensis",
  "Homo Sapiens",
];

it("should shuffle the array", () => {
  expect(shuffleArray(answers)).toHaveLength(answers.length);
  expect(
    shuffleArray(answers).every((answer) => answers.includes(answer))
  ).toBe(true);
});
