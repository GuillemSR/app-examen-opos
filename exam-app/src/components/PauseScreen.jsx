import React, { useState } from 'react';

const PauseScreen = ({ onResume, onAbandon, formatTime, timeRemaining }) => {
  const [showAbandonConfirm, setShowAbandonConfirm] = useState(false);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="card max-w-md w-full p-8">
        {!showAbandonConfirm ? (
          <>
            {/* Pantalla de pausa */}
            <div className="text-center">
              <div className="mb-6">
                <svg 
                  className="w-20 h-20 mx-auto text-warning" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                  />
                </svg>
              </div>
              
              <h2 className="text-3xl font-bold text-foreground mb-4">Examen Pausado</h2>
              <p className="text-muted-foreground mb-6">
                Tu examen está en pausa. Tiempo restante: <span className="font-bold text-warning">{formatTime(timeRemaining)}</span>
              </p>

              <div className="space-y-3">
                <button
                  onClick={onResume}
                  className="btn-success w-full py-4"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Reanudar Examen
                </button>

                <button
                  onClick={() => setShowAbandonConfirm(true)}
                  className="btn-danger w-full py-4"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  Abandonar Examen
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* Confirmación de abandono */}
            <div className="text-center">
              <div className="mb-6">
                <svg 
                  className="w-20 h-20 mx-auto text-danger" 
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
              
              <h2 className="text-2xl font-bold text-foreground mb-4">¿Abandonar el examen?</h2>
              <p className="text-muted-foreground mb-6">
                Si abandonas el examen, perderás todo el progreso y no podrás recuperarlo.
              </p>

              <div className="space-y-3">
                <button
                  onClick={() => setShowAbandonConfirm(false)}
                  className="btn-secondary w-full py-4"
                >
                  Cancelar
                </button>

                <button
                  onClick={onAbandon}
                  className="btn-danger w-full py-4"
                >
                  Sí, Abandonar Examen
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PauseScreen;
