import React from 'react';

const ExamStatus = ({ stats, timeRemaining, formatTime, questions, userAnswers, onClose, onGoToQuestion }) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-blue-600 dark:bg-slate-800 text-white p-6 rounded-t-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Estado del Examen</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Contenido */}
        <div className="p-6">
          {/* Estadísticas principales */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 dark:bg-slate-800 rounded-lg p-4">
              <div className="text-blue-600 dark:text-slate-300 text-sm font-semibold mb-1">Tiempo Restante</div>
              <div className="text-2xl font-bold text-blue-900 dark:text-slate-100">{formatTime(timeRemaining)}</div>
            </div>
            <div className="bg-green-50 dark:bg-emerald-900/20 rounded-lg p-4">
              <div className="text-green-600 dark:text-emerald-300 text-sm font-semibold mb-1">Respondidas</div>
              <div className="text-2xl font-bold text-green-900 dark:text-emerald-100">{stats.answered}/{stats.total}</div>
            </div>
            <div className="bg-orange-50 dark:bg-amber-900/20 rounded-lg p-4 col-span-2 md:col-span-1">
              <div className="text-orange-600 dark:text-amber-300 text-sm font-semibold mb-1">Sin Responder</div>
              <div className="text-2xl font-bold text-orange-900 dark:text-amber-100">{stats.unanswered}</div>
            </div>
          </div>

          {/* Mapa de preguntas */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 dark:text-slate-100 mb-3">Mapa de Preguntas</h3>
            <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
              {questions.map((_, index) => {
                const isAnswered = userAnswers[index] && userAnswers[index].length > 0;
                return (
                  <button
                    key={index}
                    onClick={() => {
                      onGoToQuestion(index);
                      onClose();
                    }}
                    className={`aspect-square rounded-lg font-semibold text-sm transition-all hover:scale-110 ${
                      isAnswered
                        ? 'bg-green-600 text-white hover:bg-green-700'
                        : 'bg-gray-300 text-gray-700 hover:bg-gray-400 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600'
                    }`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Leyenda */}
          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-600 rounded-lg"></div>
              <span className="text-sm text-gray-700 dark:text-slate-300">Respondida</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-300 dark:bg-slate-700 rounded-lg"></div>
              <span className="text-sm text-gray-700 dark:text-slate-300">Sin responder</span>
            </div>
          </div>

          {/* Botón cerrar */}
          <div className="mt-6">
            <button
              onClick={onClose}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors dark:bg-blue-700 dark:hover:bg-blue-600"
            >
              Continuar Examen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamStatus;
