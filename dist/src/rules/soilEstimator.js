"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.estimateSoilType = void 0;
const emptyScore = () => ({ acidic: 0, sandy: 0, medium: 0 });
const addScore = (base, delta) => ({
    acidic: base.acidic + delta.acidic,
    sandy: base.sandy + delta.sandy,
    medium: base.medium + delta.medium,
});
const estimateSoilType = (questions, answers) => {
    let scores = emptyScore();
    const reasoning = [];
    for (const answer of answers) {
        const question = questions.find((item) => item.id === answer.questionId);
        const option = question?.options.find((item) => item.id === answer.optionId);
        if (question && option) {
            scores = addScore(scores, option.score);
            reasoning.push(`${question.text}: ${option.label}`);
        }
    }
    const ordered = [
        { soilType: "acidic", score: scores.acidic },
        { soilType: "sandy", score: scores.sandy },
        { soilType: "medium", score: scores.medium },
    ].sort((a, b) => b.score - a.score);
    const topScore = ordered[0].score;
    const topCandidates = ordered.filter((item) => item.score === topScore);
    const soilType = topCandidates.length === 1 ? topCandidates[0].soilType : "medium";
    return { soilType, scores, reasoning };
};
exports.estimateSoilType = estimateSoilType;
