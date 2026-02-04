import React from 'react';

const Results = ({ results, onReview, onNewExam, onHome }) => {
  const { correct, incorrect, unanswered, points, maxPoints, percentage } = results;

  // Determinar el mensaje según el porcentaje
  const getMessage = () => {
    if (percentage >= 90) return { text: '¡Excelente!', color: 'text-green-600', emoji: '🎉' };
    if (percentage >= 70) return { text: '¡Muy Bien!', color: 'text-blue-600', emoji: '👍' };
    if (percentage >= 50) return { text: 'Bien', color: 'text-yellow-600', emoji: '👌' };
    return { text: 'Necesitas Mejorar', color: 'text-red-600', emoji: '📚' };
  };

  const message = getMessage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-500 to-blue-600 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl max-w-2xl w-full p-8 md:p-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{message.emoji}</div>
          <h1 className={`text-4xl font-bold ${message.color} dark:text-slate-100 mb-2`}>
            {message.text}
          </h1>
          <p className="text-gray-600 dark:text-slate-300">Has completado el examen</p>
        </div>

        {/* Puntuación principal */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-slate-800 dark:to-slate-700 rounded-xl p-8 mb-6 text-center text-white">
          <div className="text-lg font-semibold mb-2">Puntuación Final</div>
          <div className="text-5xl font-bold mb-2">
            {points.toFixed(2)} / {maxPoints}
          </div>
          <div className="text-2xl font-semibold">
            {percentage}% de acierto
          </div>
        </div>

        {/* Desglose de resultados */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-green-50 dark:bg-emerald-900/20 rounded-lg p-4 text-center">
            <div className="text-green-600 text-3xl font-bold mb-1">{correct}</div>
            <div className="text-green-700 dark:text-emerald-200 text-sm font-semibold">Correctas</div>
            <div className="text-green-600 dark:text-emerald-300 text-xs mt-1">+{correct} puntos</div>
          </div>
          
          <div className="bg-red-50 dark:bg-rose-900/20 rounded-lg p-4 text-center">
            <div className="text-red-600 text-3xl font-bold mb-1">{incorrect}</div>
            <div className="text-red-700 dark:text-rose-200 text-sm font-semibold">Incorrectas</div>
            <div className="text-red-600 dark:text-rose-300 text-xs mt-1">{(incorrect * -0.25).toFixed(2)} puntos</div>
          </div>
          
          <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4 text-center">
            <div className="text-gray-600 dark:text-slate-200 text-3xl font-bold mb-1">{unanswered}</div>
            <div className="text-gray-700 dark:text-slate-200 text-sm font-semibold">Sin Responder</div>
            <div className="text-gray-600 dark:text-slate-300 text-xs mt-1">0 puntos</div>
          </div>
        </div>

        {/* Análisis */}
          <div className="bg-blue-50 dark:bg-slate-800 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-bold text-blue-900 dark:text-slate-100 mb-3">Análisis de Resultados</h3>
            <div className="space-y-2 text-sm text-blue-800 dark:text-slate-200">
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
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2 dark:bg-purple-700 dark:hover:bg-purple-600"
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
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2 dark:bg-blue-700 dark:hover:bg-blue-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Realizar Nuevo Examen
          </button>

          <button
            onClick={onHome}
            className="w-full bg-gray-500 hover:bg-gray-600 text-white font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2 dark:bg-slate-700 dark:hover:bg-slate-600"
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
