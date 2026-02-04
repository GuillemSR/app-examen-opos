import React from 'react';

const Navigation = ({ 
  onPrevious, 
  onNext, 
  onShowStatus, 
  onPause,
  canGoPrevious, 
  canGoNext,
  currentQuestion,
  totalQuestions
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg shadow-lg p-4">
      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-600 dark:text-slate-300 mb-2">
          <span>Progreso</span>
          <span>{currentQuestion}/{totalQuestions}</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-slate-800 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Botones de navegación */}
      <div className="grid grid-cols-2 gap-3">
        {/* Botón Anterior */}
        <button
          onClick={onPrevious}
          disabled={!canGoPrevious}
          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all ${
            canGoPrevious
              ? 'bg-gray-600 hover:bg-gray-700 text-white dark:bg-slate-700 dark:hover:bg-slate-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-slate-700 dark:text-slate-300'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="hidden md:inline">Anterior</span>
        </button>

        {/* Botón Siguiente */}
        <button
          onClick={onNext}
          disabled={!canGoNext}
          className={`flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all ${
            canGoNext
              ? 'bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-600'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed dark:bg-slate-700 dark:text-slate-300'
          }`}
        >
          <span className="hidden md:inline">Siguiente</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Botón Estado del Examen */}
        <button
          onClick={onShowStatus}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold bg-purple-600 hover:bg-purple-700 text-white transition-all dark:bg-purple-700 dark:hover:bg-purple-600"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span className="hidden md:inline">Estado</span>
        </button>

        {/* Botón Pausar */}
        <button
          onClick={onPause}
          className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold bg-orange-600 hover:bg-orange-700 text-white transition-all dark:bg-amber-600 dark:hover:bg-amber-500"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="hidden md:inline">Pausar</span>
        </button>
      </div>
    </div>
  );
};

export default Navigation;
