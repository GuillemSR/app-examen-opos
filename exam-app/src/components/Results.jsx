import React from 'react';

const Results = ({ results, onReview, onNewExam, onHome }) => {
  const { correct, incorrect, unanswered, points, maxPoints, percentage } = results;

  // Determinar el mensaje según el porcentaje
  const getMessage = () => {
    if (percentage >= 90) return { text: '¡Excelente!', icon: 'sparkles' };
    if (percentage >= 70) return { text: '¡Muy Bien!', icon: 'thumb' };
    if (percentage >= 50) return { text: 'Bien', icon: 'check' };
    return { text: 'Necesitas Mejorar', icon: 'book' };
  };

  const message = getMessage();

  const getIcon = (type) => {
    switch(type) {
      case 'sparkles':
        return (
          <svg className="w-16 h-16 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        );
      case 'thumb':
        return (
          <svg className="w-16 h-16 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
          </svg>
        );
      case 'check':
        return (
          <svg className="w-16 h-16 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'book':
        return (
          <svg className="w-16 h-16 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="card max-w-2xl w-full p-8 md:p-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="mb-4 flex justify-center">
            {getIcon(message.icon)}
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">
            {message.text}
          </h1>
          <p className="text-muted-foreground">Has completado el examen</p>
        </div>

        {/* Puntuación principal - Degradado sutil */}
        <div className="relative rounded-xl p-8 mb-6 text-center text-white overflow-hidden">
          {/* Degradado de fondo sutil */}
          <div className="absolute inset-0 bg-gradient-to-br from-sky-500/90 to-sky-600/90 dark:from-sky-600/80 dark:to-sky-700/80"></div>
          <div className="relative z-10">
            <div className="text-lg font-semibold mb-2 text-sky-50">Puntuación Final</div>
            <div className="text-5xl font-bold mb-2">
              {points.toFixed(2)} / {maxPoints}
            </div>
            <div className="text-2xl font-semibold text-sky-50">
              {percentage}% de acierto
            </div>
          </div>
        </div>

        {/* Desglose de resultados */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-lg p-4 text-center border border-emerald-200 dark:border-emerald-900/30">
            <div className="text-emerald-600 dark:text-emerald-400 text-3xl font-bold mb-1">{correct}</div>
            <div className="text-emerald-700 dark:text-emerald-300 text-sm font-semibold">Correctas</div>
            <div className="text-emerald-600 dark:text-emerald-400 text-xs mt-1">+{correct} puntos</div>
          </div>
          
          <div className="bg-rose-50 dark:bg-rose-950/20 rounded-lg p-4 text-center border border-rose-200 dark:border-rose-900/30">
            <div className="text-rose-600 dark:text-rose-400 text-3xl font-bold mb-1">{incorrect}</div>
            <div className="text-rose-700 dark:text-rose-300 text-sm font-semibold">Incorrectas</div>
            <div className="text-rose-600 dark:text-rose-400 text-xs mt-1">{(incorrect * -0.25).toFixed(2)} puntos</div>
          </div>
          
          <div className="bg-surface-2 rounded-lg p-4 text-center border border-border">
            <div className="text-muted-foreground text-3xl font-bold mb-1">{unanswered}</div>
            <div className="text-muted-foreground text-sm font-semibold">Sin Responder</div>
            <div className="text-muted-foreground text-xs mt-1">0 puntos</div>
          </div>
        </div>

        {/* Análisis */}
          <div className="bg-surface-2 rounded-lg p-6 mb-8 border border-border">
            <h3 className="text-lg font-bold text-foreground mb-3">Análisis de Resultados</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Total de preguntas:</span>
                <span className="font-semibold">{correct + incorrect + unanswered}</span>
              </div>
            <div className="flex justify-between">
              <span>Tasa de respuesta:</span>
              <span className="font-semibold">
                {(((correct + incorrect) / (correct + incorrect + unanswered)) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span>Tasa de acierto (sobre respondidas):</span>
              <span className="font-semibold">
                {correct + incorrect > 0 ? ((correct / (correct + incorrect)) * 100).toFixed(1) : 0}%
              </span>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="space-y-3">
          {incorrect > 0 && (
            <button
              onClick={onReview}
              className="btn-secondary w-full py-4"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Ver Preguntas Incorrectas ({incorrect})
            </button>
          )}
          
          <button
            onClick={onNewExam}
            className="btn-primary w-full py-4"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Realizar Nuevo Examen
          </button>

          <button
            onClick={onHome}
            className="btn-ghost w-full py-4"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default Results;
