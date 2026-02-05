import React from 'react';

const ExamSetup = ({ onStart, loading, hasRestoredExam, onRestore, onShowStats }) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="card max-w-2xl w-full p-8 md:p-12">
        <div className="text-center">
          {/* Icono */}
          <div className="mb-6">
            <svg 
              className="w-20 h-20 mx-auto text-primary" 
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
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Examen de Oposición
          </h1>
          <p className="text-muted-foreground mb-8">
            Practica para tu examen con preguntas reales de oposiciones
          </p>

          {/* Configuración del examen */}
          <div className="bg-surface-2 rounded-lg p-6 mb-8 text-left border border-border">
            <h2 className="text-xl font-bold text-foreground mb-4">Configuración del Examen</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Número de preguntas:</span>
                <span className="font-bold text-foreground">20</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Duración:</span>
                <span className="font-bold text-foreground">30 minutos</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Pregunta correcta:</span>
                <span className="font-bold text-green-600">+1 punto</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Pregunta incorrecta:</span>
                <span className="font-bold text-rose-600">-0.25 puntos</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Sin responder:</span>
                <span className="font-bold text-muted-foreground">0 puntos</span>
              </div>
            </div>
          </div>

          {/* Instrucciones */}
          <div className="bg-amber-50 dark:bg-amber-950/20 border-l-4 border-amber-500 p-4 mb-8 text-left rounded-r-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-amber-900 dark:text-amber-200">Instrucciones</h3>
                <div className="mt-2 text-sm text-amber-800 dark:text-amber-300">
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
              className="btn-success w-full py-4 mb-4"
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
            className="btn-primary w-full py-4"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
            className="btn-secondary w-full py-4 mt-4"
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
