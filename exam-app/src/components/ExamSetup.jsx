import React from 'react';

const ExamSetup = ({ onStart, loading, hasRestoredExam, onRestore, onShowStats }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl max-w-2xl w-full p-8 md:p-12">
        <div className="text-center">
          {/* Icono */}
          <div className="mb-6">
            <svg 
              className="w-20 h-20 mx-auto text-blue-600 dark:text-blue-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
              />
            </svg>
          </div>

          {/* Título */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-slate-100 mb-4">
            Examen de Oposición
          </h1>
          <p className="text-gray-600 dark:text-slate-300 mb-8">
            Practica para tu examen con preguntas reales de oposiciones
          </p>

          {/* Configuración del examen */}
          <div className="bg-blue-50 dark:bg-slate-800 rounded-lg p-6 mb-8 text-left">
            <h2 className="text-xl font-bold text-blue-900 dark:text-slate-100 mb-4">Configuración del Examen</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-slate-300">Número de preguntas:</span>
                <span className="font-bold text-blue-900 dark:text-slate-100">20</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-slate-300">Duración:</span>
                <span className="font-bold text-blue-900 dark:text-slate-100">30 minutos</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-slate-300">Pregunta correcta:</span>
                <span className="font-bold text-green-600">+1 punto</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-slate-300">Pregunta incorrecta:</span>
                <span className="font-bold text-red-600">-0.25 puntos</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-700 dark:text-slate-300">Sin responder:</span>
                <span className="font-bold text-gray-600 dark:text-slate-200">0 puntos</span>
              </div>
            </div>
          </div>

          {/* Instrucciones */}
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 mb-8 text-left">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Instrucciones</h3>
                <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-100">
                  <ul className="list-disc list-inside space-y-1">
                    <li>Lee cuidadosamente cada pregunta</li>
                    <li>Algunas preguntas pueden tener múltiples respuestas correctas</li>
                    <li>Puedes pausar el examen en cualquier momento</li>
                    <li>Al finalizar, podrás revisar las respuestas incorrectas</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Botones */}
          {hasRestoredExam && (
            <button
              onClick={onRestore}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg mb-4 transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Continuar Examen Anterior
            </button>
          )}
          
          <button
            onClick={onStart}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-colors disabled:bg-gray-400 dark:disabled:bg-slate-700 disabled:cursor-not-allowed flex items-center justify-center gap-2 dark:bg-blue-700 dark:hover:bg-blue-600"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Cargando...
              </>
            ) : (
              <>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {hasRestoredExam ? 'Iniciar Nuevo Examen' : 'Iniciar Examen'}
              </>
            )}
          </button>

          {/* Botón de estadísticas */}
          <button
            onClick={onShowStats}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-6 rounded-lg mt-4 transition-colors flex items-center justify-center gap-2 dark:bg-purple-700 dark:hover:bg-purple-600"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Ver Estadísticas
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamSetup;
