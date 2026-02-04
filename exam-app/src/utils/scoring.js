// Calcular la puntuación del examen
export const calculateScore = (questions, userAnswers) => {
  let correct = 0;
  let incorrect = 0;
  let unanswered = 0;
  const incorrectQuestions = [];

  questions.forEach((question, index) => {
    const userAnswer = userAnswers[index];
    
    if (!userAnswer || userAnswer.length === 0) {
      unanswered++;
      return;
    }

    // Verificar si la respuesta es correcta
    const correctAnswers = question.correct.sort();
    const userAnswersSorted = [...userAnswer].sort();
    
    const isCorrect = 
      correctAnswers.length === userAnswersSorted.length &&
      correctAnswers.every((ans, idx) => ans === userAnswersSorted[idx]);

    if (isCorrect) {
      correct++;
    } else {
      incorrect++;
      incorrectQuestions.push({
        ...question,
        questionIndex: index,
        userAnswer: userAnswer
      });
    }
  });

  // Puntuación: +1 por correcta, -0.25 por incorrecta, 0 por sin responder
  const points = (correct * 1) + (incorrect * -0.25);
  const maxPoints = questions.length;
  const percentage = (correct / questions.length) * 100;

  return {
    correct,
    incorrect,
    unanswered,
    points: Math.max(0, points), // No permitir puntuación negativa
    maxPoints,
    percentage: percentage.toFixed(2),
    incorrectQuestions
  };
};
