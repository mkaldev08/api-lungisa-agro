import type { Score, SoilAnswer, SoilQuestion, SoilType } from "../../types";

const emptyScore = (): Score => ({ acidic: 0, sandy: 0, medium: 0 });

const addScore = (base: Score, delta: Score): Score => ({
  acidic: base.acidic + delta.acidic,
  sandy: base.sandy + delta.sandy,
  medium: base.medium + delta.medium,
});

export const estimateSoilType = (
  questions: SoilQuestion[],
  answers: SoilAnswer[],
): { soilType: SoilType; scores: Score; reasoning: string[] } => {
  let scores = emptyScore();
  const reasoning: string[] = [];

  for (const answer of answers) {
    const question = questions.find((item) => item.id === answer.questionId);
    const option = question?.options.find(
      (item) => item.id === answer.optionId,
    );

    if (question && option) {
      scores = addScore(scores, option.score);
      reasoning.push(`${question.text}: ${option.label}`);
    }
  }

  const ordered: Array<{ soilType: SoilType; score: number }> = [
    { soilType: "acidic" as const, score: scores.acidic },
    { soilType: "sandy" as const, score: scores.sandy },
    { soilType: "medium" as const, score: scores.medium },
  ].sort((a, b) => b.score - a.score);

  const topScore = ordered[0].score;
  const topCandidates = ordered.filter((item) => item.score === topScore);
  const soilType =
    topCandidates.length === 1 ? topCandidates[0].soilType : "medium";

  return { soilType, scores, reasoning };
};
