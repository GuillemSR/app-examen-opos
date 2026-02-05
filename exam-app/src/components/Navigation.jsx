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
    <div className="card p-4">
      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>Progreso</span>
          <span>{currentQuestion}/{totalQuestions}</span>
        </div>
        <div className="w-full bg-surface-2 rounded-full h-2 border border-border">
          <div 
            className="h-2 rounded-full transition-all duration-300"
            style={{ 
              width: `${(currentQuestion / totalQuestions) * 100}%`,
              backgroundColor: 'rgb(var(--primary))'
            }}
          />
        </div>
      </div>

      {/* Botones de navegación */}
      <div className="grid grid-cols-2 gap-3">
        {/* Botón Anterior */}
        <button
          onClick={onPrevious}
          disabled={!canGoPrevious}
          className="btn-secondary flex items-center justify-center gap-2 px-4 py-3"
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
          className="btn-primary flex items-center justify-center gap-2 px-4 py-3"
        >
          <span className="hidden md:inline">Siguiente</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Botón Estado del Examen */}
        <button
          onClick={onShowStatus}
          className="btn-secondary flex items-center justify-center gap-2 px-4 py-3"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <span className="hidden md:inline">Estado</span>
        </button>

        {/* Botón Pausar - con icono warning pero botón neutro */}
        <button
          onClick={onPause}
          className="btn-secondary flex items-center justify-center gap-2 px-4 py-3"
        >
          <svg className="w-5 h-5 text-warning" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="hidden md:inline">Pausar</span>
        </button>
      </div>
    </div>
  );
};

export default Navigation;
