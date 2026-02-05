import React, { useState } from 'react';
import { useStatistics } from '../hooks/useStatistics';
import StatsCards from './charts/StatsCards';
import ProgressionChart from './charts/ProgressionChart';
import DurationChart from './charts/DurationChart';
import ScoreDurationScatter from './charts/ScoreDurationScatter';
import TopFailedQuestions from './charts/TopFailedQuestions';

const Statistics = ({ onBack }) => {
  const {
    stats,
    loading,
    error,
    refetch,
    formatDuration,
    getProgressionData,
    getDurationData,
    getScoreDurationData,
    getUnansweredDurationData,
    deleteExam,
    clearAll
  } = useStatistics();

  // Estado para modal de confirmación
  const [confirmModal, setConfirmModal] = useState({ show: false, type: null, examId: null });

  // Manejadores de confirmación
  const handleDeleteClick = (examId) => {
    setConfirmModal({ show: true, type: 'single', examId });
  };

  const handleClearAllClick = () => {
    setConfirmModal({ show: true, type: 'all', examId: null });
  };

  const handleConfirm = () => {
    if (confirmModal.type === 'single') {
      deleteExam(confirmModal.examId);
    } else if (confirmModal.type === 'all') {
      clearAll();
    }
    setConfirmModal({ show: false, type: null, examId: null });
  };

  const handleCancel = () => {
    setConfirmModal({ show: false, type: null, examId: null });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <svg className="animate-spin h-12 w-12 mx-auto mb-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-xl font-semibold text-foreground">Cargando estadísticas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="card max-w-md w-full p-8 text-center">
          <svg className="w-16 h-16 mx-auto text-danger mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <h2 className="text-xl font-bold text-foreground mb-2">Error al cargar</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <button
            onClick={refetch}
            className="btn-primary mr-2"
          >
            Reintentar
          </button>
          <button
            onClick={onBack}
            className="btn-secondary"
          >
            Volver
          </button>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="card max-w-md w-full p-8 text-center">
          <svg className="w-20 h-20 mx-auto text-primary mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          <h2 className="text-2xl font-bold text-foreground mb-2">Sin datos aún</h2>
          <p className="text-muted-foreground mb-6">
            Completa tu primer examen para ver las estadísticas aquí.
          </p>
          <button
            onClick={onBack}
            className="btn-primary py-3 px-6"
          >
            Hacer un Examen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Degradado sutil */}
      <div className="relative bg-surface border-b border-border text-foreground py-8 px-4 overflow-hidden">
        {/* Degradado de fondo muy sutil */}
        <div className="absolute inset-0 bg-gradient-to-r from-sky-500/5 to-sky-600/5 dark:from-sky-600/10 dark:to-sky-700/10"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Estadísticas</h1>
              <p className="text-muted-foreground">
                Análisis de tu rendimiento en {stats.totalExams} {stats.totalExams === 1 ? 'examen' : 'exámenes'}
              </p>
            </div>
            <button
              onClick={onBack}
              className="btn-ghost"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver
            </button>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Cards de resumen */}
        <StatsCards stats={stats} formatDuration={formatDuration} />

        {/* Gráficos en grid */}
        <div className="space-y-6">
          {/* Fila 1: Progresión y Duración */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <ProgressionChart data={getProgressionData()} />
            <DurationChart data={getDurationData()} />
          </div>

          {/* Fila 2: Scatter plots */}
          <ScoreDurationScatter 
            data={getScoreDurationData()} 
            unansweredData={getUnansweredDurationData()} 
          />

          {/* Fila 3: Top preguntas falladas */}
          <TopFailedQuestions data={stats.topFailed} />
        </div>

        {/* Historial de exámenes */}
        <div className="mt-8 card p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-foreground">
              Historial de Exámenes
            </h3>
            <button
              onClick={handleClearAllClick}
              className="flex items-center gap-2 px-3 py-1.5 text-sm text-danger hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-lg transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Limpiar todo
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-muted-foreground">#</th>
                  <th className="text-left py-3 px-2 text-muted-foreground">Fecha</th>
                  <th className="text-center py-3 px-2 text-muted-foreground">Duración</th>
                  <th className="text-center py-3 px-2 text-emerald-600 dark:text-emerald-400">Correctas</th>
                  <th className="text-center py-3 px-2 text-rose-600 dark:text-rose-400">Incorrectas</th>
                  <th className="text-center py-3 px-2 text-muted-foreground">Sin Resp.</th>
                  <th className="text-center py-3 px-2 text-muted-foreground">Puntos</th>
                  <th className="text-center py-3 px-2 text-primary">%</th>
                  <th className="text-center py-3 px-2 text-muted-foreground">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {stats.history.slice().reverse().map((exam, index) => {
                  const date = new Date(exam.created_at);
                  const formattedDate = date.toLocaleDateString('es-ES', {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit'
                  });
                  const formattedTime = date.toLocaleTimeString('es-ES', {
                    hour: '2-digit',
                    minute: '2-digit'
                  });
                  
                  return (
                    <tr 
                      key={exam.id} 
                      className="border-b border-border hover:bg-surface-hover"
                    >
                      <td className="py-3 px-2 text-foreground font-medium">
                        {stats.history.length - index}
                      </td>
                      <td className="py-3 px-2 text-foreground">
                        <div>{formattedDate}</div>
                        <div className="text-xs text-muted-foreground">{formattedTime}</div>
                      </td>
                      <td className="py-3 px-2 text-center text-foreground">
                        {formatDuration(exam.duration_seconds)}
                      </td>
                      <td className="py-3 px-2 text-center text-emerald-600 dark:text-emerald-400 font-semibold">
                        {exam.correct}
                      </td>
                      <td className="py-3 px-2 text-center text-rose-600 dark:text-rose-400 font-semibold">
                        {exam.incorrect}
                      </td>
                      <td className="py-3 px-2 text-center text-muted-foreground">
                        {exam.unanswered}
                      </td>
                      <td className="py-3 px-2 text-center text-foreground font-semibold">
                        {parseFloat(exam.points).toFixed(2)}
                      </td>
                      <td className="py-3 px-2 text-center">
                        <span className={`font-semibold ${
                          exam.percentage >= 70 ? 'text-emerald-600 dark:text-emerald-400' :
                          exam.percentage >= 50 ? 'text-amber-600 dark:text-amber-400' : 'text-rose-600 dark:text-rose-400'
                        }`}>
                          {exam.percentage}%
                        </span>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <button
                          onClick={() => handleDeleteClick(exam.id)}
                          className="p-1.5 text-danger hover:bg-rose-50 dark:hover:bg-rose-950/20 rounded-lg transition-colors"
                          title="Eliminar examen"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modal de confirmación */}
      {confirmModal.show && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="card max-w-md w-full p-6">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-rose-100 dark:bg-rose-950/30 mb-4">
                <svg className="h-6 w-6 text-danger" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">
                {confirmModal.type === 'all' ? '¿Eliminar todo el historial?' : '¿Eliminar este examen?'}
              </h3>
              <p className="text-muted-foreground mb-6">
                {confirmModal.type === 'all' 
                  ? 'Esta acción eliminará todos los exámenes guardados. No se puede deshacer.'
                  : 'Esta acción no se puede deshacer.'}
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={handleCancel}
                  className="btn-secondary"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleConfirm}
                  className="btn-danger"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Statistics;
