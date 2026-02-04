import React from 'react';

const FinishConfirmation = ({ stats, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-slate-900 rounded-lg shadow-2xl max-w-md w-full p-6">
        {/* Icono de advertencia */}
        <div className="flex justify-center mb-4">
          <svg 
            className="w-16 h-16 text-yellow-500" 
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
        <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-100 text-center mb-4">
          ¿Finalizar el examen?
        </h2>

        {/* Estadísticas */}
        <div className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4 mb-6">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-slate-300">Total de preguntas:</span>
              <span className="font-semibold text-gray-900 dark:text-slate-100">{stats.total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-slate-300">Respondidas:</span>
              <span className="font-semibold text-green-600 dark:text-emerald-300">{stats.answered}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-slate-300">Sin responder:</span>
              <span className="font-semibold text-orange-600 dark:text-amber-300">{stats.unanswered}</span>
            </div>
          </div>
        </div>

        {/* Advertencia si hay preguntas sin responder */}
        {stats.unanswered > 0 && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700 dark:text-yellow-100">
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
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors dark:bg-rose-700 dark:hover:bg-rose-600"
          >
            Sí, Finalizar Examen
          </button>
          
          <button
            onClick={onCancel}
            className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 rounded-lg transition-colors dark:bg-slate-700 dark:hover:bg-slate-600"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinishConfirmation;
