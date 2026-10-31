import { describe, expect, it } from "vitest";
import { ideaQuestions, interviewQuestions, makeInitialArtifacts } from "@/lib/discovery-demo";

describe("Initial self-interview artifacts", () => {
  it("does not count a simulated self-interview as real customer evidence", () => {
    const result = makeInitialArtifacts(ideaQuestions.map(q => q.answer), interviewQuestions.map(q => q.answer));
    expect(result.realInterviews).toBe(0);
    expect(result.evidence).toBe("hypothesis");
  });
  it("uses the user's edited opportunity and client in the generated draft", () => {
    const answers = ideaQuestions.map(q => q.answer);
    answers[5] = "Parqueo para familias";
    answers[0] = "Familias que llegan en auto";
    const result = makeInitialArtifacts(answers, ["Ayer tardé 15 minutos"]);
    expect(result.title).toBe("Parqueo para familias");
    expect(result.client).toBe("Familias que llegan en auto");
    expect(result.interview).toEqual(["Ayer tardé 15 minutos"]);
  });
});