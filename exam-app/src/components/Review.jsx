import React, { useState } from 'react';
import { formatExamFilename } from '../utils/questionLoader';

const ReviewQuestion = ({ question, userAnswer }) => {
  const correctAnswers = question.correct || [];
  const isCorrect = answerId => correctAnswers.includes(answerId);
  const isUserAnswer = answerId => userAnswer && userAnswer.includes(answerId);

  return (
    <div className="card p-6 mb-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4 pb-4 border-b border-border">
        <div className="flex items-center gap-2">
          <span className="badge-danger px-3 py-1 rounded-full text-sm font-semibold">
            Incorrecta
          </span>
          {correctAnswers.length > 1 && (
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
      <h3 className="text-lg md:text-xl font-semibold text-foreground mb-6">
        {question.question}
      </h3>

      {/* Respuestas */}
      <div className="space-y-3">
        {Object.entries(question.answers).map(([key, value]) => {
          const correct = isCorrect(key);
          const userSelected = isUserAnswer(key);
          
          let className = 'border-2 p-4 rounded-lg ';
          let icon = null;
          
          if (correct && userSelected) {
            // Correcta y seleccionada (no debería pasar en incorrectas)
            className += 'border-success bg-success/5';
            icon = (
              <svg className="w-6 h-6 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            );
          } else if (correct && !userSelected) {
            // Correcta pero no seleccionada
            className += 'border-success bg-success/5';
            icon = (
              <svg className="w-6 h-6 text-success" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            );
          } else if (!correct && userSelected) {
            // Incorrecta y seleccionada
            className += 'border-danger bg-danger/5';
            icon = (
              <svg className="w-6 h-6 text-danger" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            );
          } else {
            // No seleccionada y no correcta
            className += 'border-border bg-surface';
          }

          return (
            <div key={key} className={className}>
              <div className="flex items-start gap-3">
                {icon && <div className="flex-shrink-0 mt-0.5">{icon}</div>}
                <div className="flex-1">
                  <span className="font-semibold mr-2 text-foreground">{key})</span>
                  <span className={`${correct ? 'text-success font-medium' : userSelected ? 'text-danger' : 'text-muted-foreground'}`}>
                    {value}
                  </span>
                  {correct && !userSelected && (
                    <span className="ml-2 text-success text-sm font-semibold">(Respuesta correcta)</span>
                  )}
                  {!correct && userSelected && (
                    <span className="ml-2 text-danger text-sm font-semibold">(Tu respuesta)</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Review = ({ incorrectQuestions, onBackToResults }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQuestion = incorrectQuestions[currentIndex];

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="card p-4 md:p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                Revisión de Preguntas Incorrectas
              </h1>
              <p className="text-muted-foreground mt-1">
                Pregunta {currentIndex + 1} de {incorrectQuestions.length}
              </p>
            </div>
              <button
                onClick={onBackToResults}
                className="btn-secondary px-6 py-3 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              Volver a Resultados
            </button>
          </div>
        </div>

        {/* Pregunta actual */}
        <ReviewQuestion 
          question={currentQuestion} 
          userAnswer={currentQuestion.userAnswer} 
        />

        {/* Navegación */}
        <div className="card p-4">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
              disabled={currentIndex === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                currentIndex === 0
                  ? 'bg-surface border border-border text-muted-foreground cursor-not-allowed'
                  : 'btn-primary'
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Anterior
            </button>

            <div className="text-center flex-1">
              <div className="text-sm text-muted-foreground mb-2">Progreso de revisión</div>
              <div className="w-full bg-surface rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / incorrectQuestions.length) * 100}%` }}
                />
              </div>
            </div>

            <button
              onClick={() => setCurrentIndex(Math.min(incorrectQuestions.length - 1, currentIndex + 1))}
              disabled={currentIndex === incorrectQuestions.length - 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                currentIndex === incorrectQuestions.length - 1
                  ? 'bg-surface border border-border text-muted-foreground cursor-not-allowed'
                  : 'btn-primary'
              }`}
            >
              Siguiente
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Mini-mapa de preguntas incorrectas */}
          <div className="mt-4 pt-4 border-t border-border">
            <div className="text-sm text-muted-foreground mb-2 text-center">Ir a pregunta incorrecta:</div>
            <div className="flex flex-wrap justify-center gap-2">
              {incorrectQuestions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-10 h-10 rounded-lg font-semibold text-sm transition-all ${
                    index === currentIndex
                      ? 'bg-primary text-white'
                      : 'bg-surface border border-border text-muted-foreground hover:bg-surface-hover'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
