import { describe, expect, it } from "vitest";
import { detectZnoResult } from "./detector";

describe("zno result detector", () => {
  it("extracts score from Ukrainian result text", () => {
    document.body.innerText = "Математика Результат: 18 з 20 правильних відповідей Час виконання 34 хв";
    expect(detectZnoResult()).toMatchObject({
      subject_slug: "math",
      score: 18,
      total_questions: 20,
      time_spent_seconds: 2040
    });
  });
});
