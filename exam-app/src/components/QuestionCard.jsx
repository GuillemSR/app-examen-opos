import React from 'react';
import { formatExamFilename } from '../utils/questionLoader';

const QuestionCard = ({ question, questionNumber, totalQuestions, userAnswer, onAnswerChange }) => {
  if (!question) return null;

  const handleAnswerToggle = (answerId) => {
    const correctAnswers = question.correct || [];
    const isMultipleChoice = correctAnswers.length > 1;

    if (isMultipleChoice) {
      // Respuesta múltiple - permitir varios checkboxes
      const currentAnswers = userAnswer || [];
      if (currentAnswers.includes(answerId)) {
        onAnswerChange(currentAnswers.filter(id => id !== answerId));
      } else {
        onAnswerChange([...currentAnswers, answerId]);
      }
    } else {
      // Respuesta única - radio button
      onAnswerChange([answerId]);
    }
  };

  const isAnswerSelected = (answerId) => {
    return userAnswer && userAnswer.includes(answerId);
  };

  const correctAnswers = question.correct || [];
  const isMultipleChoice = correctAnswers.length > 1;

  return (
    <div className="card p-4 md:p-6">
      {/* Header con número de pregunta y modelo */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4 pb-4 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="badge-primary px-3 py-1 rounded-full text-sm font-semibold">
            Pregunta {questionNumber} de {totalQuestions}
          </span>
          {isMultipleChoice && (
            <span className="badge-neutral px-3 py-1 rounded-full text-xs font-semibold">
              Múltiple
            </span>
          )}
        </div>
        <span className="text-xs md:text-sm text-muted-foreground italic">
          Modelo: {question.modelId} | {formatExamFilename(question.examModel)}
        </span>
      </div>

      {/* Pregunta */}
      <h2 className="text-lg md:text-xl font-semibold text-foreground mb-6">
        {question.question}
      </h2>

      {/* Respuestas */}
      <div className="space-y-3">
        {Object.entries(question.answers).map(([key, value]) => (
          <button
            key={key}
            onClick={() => handleAnswerToggle(key)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
              isAnswerSelected(key)
                ? 'border-primary bg-primary/5 dark:bg-primary/10'
                : 'border-border hover:border-primary/50 hover:bg-surface-hover'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                isAnswerSelected(key)
                  ? 'border-primary bg-primary'
                  : 'border-muted-foreground/40'
              }`}>
                {isAnswerSelected(key) && (
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </div>
              <div className="flex-1">
                <span className="font-semibold text-primary mr-2">{key})</span>
                <span className="text-foreground">{value}</span>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
