// vitest
import { expect, test } from "vitest";

// class
import { AnswerChecker } from "./AnswerChecker";

describe("AnswerChecker.isSimilar", () => {
  const checker = new AnswerChecker();

  type valuesProps = {
    initValue: string;
    initAnswer: string;
    expectedResult: boolean;
  };

  const values: valuesProps[] = [
    { initValue: "Rabit", initAnswer: "Rabbit", expectedResult: true },
    { initValue: "Rabit", initAnswer: "Jump", expectedResult: false },
    { initValue: "Jump", initAnswer: "Rabbit", expectedResult: false },
    { initValue: "", initAnswer: "Rabbit", expectedResult: false },
    { initValue: "the and or", initAnswer: "Rabbit", expectedResult: false },
  ];

  test.each(values)(
    "returns $expectedResult for '$initValue' vs '$initAnswer'",
    ({ initValue, initAnswer, expectedResult }) => {
      const result = checker.isSimilar(initValue, initAnswer);
      expect(result).toBe(expectedResult);
    }
  );
});
