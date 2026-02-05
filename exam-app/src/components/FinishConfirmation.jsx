import React from 'react';

const FinishConfirmation = ({ stats, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="card max-w-md w-full p-6">
        {/* Icono de advertencia */}
        <div className="flex justify-center mb-4">
          <svg 
            className="w-16 h-16 text-warning" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
            />
          </svg>
        </div>

        {/* Título */}
        <h2 className="text-2xl font-bold text-foreground text-center mb-4">
          ¿Finalizar el examen?
        </h2>

        {/* Estadísticas */}
        <div className="bg-surface rounded-lg p-4 mb-6">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total de preguntas:</span>
              <span className="font-semibold text-foreground">{stats.total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Respondidas:</span>
              <span className="font-semibold text-success">{stats.answered}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Sin responder:</span>
              <span className="font-semibold text-warning">{stats.unanswered}</span>
            </div>
          </div>
        </div>

        {/* Advertencia si hay preguntas sin responder */}
        {stats.unanswered > 0 && (
          <div className="bg-warning/10 border-l-4 border-warning rounded p-4 mb-6">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-warning" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm text-foreground">
                  Tienes {stats.unanswered} {stats.unanswered === 1 ? 'pregunta' : 'preguntas'} sin responder. Las preguntas sin responder no suman ni restan puntos.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Botones */}
        <div className="space-y-3">
          <button
            onClick={onConfirm}
            className="btn-danger w-full py-3"
          >
            Sí, Finalizar Examen
          </button>
          
          <button
            onClick={onCancel}
            className="btn-secondary w-full py-3"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinishConfirmation;
