import React from 'react';

const ExamStatus = ({ stats, timeRemaining, formatTime, questions, userAnswers, onClose, onGoToQuestion }) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="card max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-surface border-b border-border p-6 rounded-t-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-foreground">Estado del Examen</h2>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
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
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
              <div className="text-primary text-sm font-semibold mb-1">Tiempo Restante</div>
              <div className="text-2xl font-bold text-foreground">{formatTime(timeRemaining)}</div>
            </div>
            <div className="bg-success/5 border border-success/20 rounded-lg p-4">
              <div className="text-success text-sm font-semibold mb-1">Respondidas</div>
              <div className="text-2xl font-bold text-foreground">{stats.answered}/{stats.total}</div>
            </div>
            <div className="bg-warning/5 border border-warning/20 rounded-lg p-4 col-span-2 md:col-span-1">
              <div className="text-warning text-sm font-semibold mb-1">Sin Responder</div>
              <div className="text-2xl font-bold text-foreground">{stats.unanswered}</div>
            </div>
          </div>

          {/* Mapa de preguntas */}
          <div>
            <h3 className="text-lg font-bold text-foreground mb-3">Mapa de Preguntas</h3>
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
                    className={`aspect-square rounded-lg font-semibold text-sm transition-colors ${
                      isAnswered
                        ? 'bg-success text-white hover:bg-success/90'
                        : 'bg-surface border border-border text-muted-foreground hover:bg-surface-hover'
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
              <div className="w-8 h-8 bg-success rounded-lg"></div>
              <span className="text-sm text-muted-foreground">Respondida</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-surface border border-border rounded-lg"></div>
              <span className="text-sm text-muted-foreground">Sin responder</span>
            </div>
          </div>

          {/* Botón cerrar */}
          <div className="mt-6">
            <button
              onClick={onClose}
              className="btn-primary w-full py-3"
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
