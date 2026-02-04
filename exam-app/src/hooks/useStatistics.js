import { useState, useEffect, useCallback } from 'react';
import { getAggregatedStats, deleteExamResult, clearAllHistory } from '../services/storage';

export const useStatistics = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = useCallback(() => {
    setLoading(true);
    setError(null);
    try {
      const data = getAggregatedStats();
      setStats(data);
    } catch (err) {
      setError(err.message);
      console.error('Error cargando estadísticas:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // Formatear duración en minutos:segundos
  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Formatear fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Preparar datos para gráfico de progresión
  const getProgressionData = () => {
    if (!stats?.history) return [];
    return stats.history.map((exam, index) => ({
      name: `#${index + 1}`,
      fecha: formatDate(exam.created_at),
      correctas: exam.correct,
      incorrectas: exam.incorrect,
      sinResponder: exam.unanswered,
      porcentaje: parseFloat(exam.percentage)
    }));
  };

  // Preparar datos para gráfico de duración
  const getDurationData = () => {
    if (!stats?.history) return [];
    return stats.history.map((exam, index) => ({
      name: `#${index + 1}`,
      fecha: formatDate(exam.created_at),
      duracion: Math.round(exam.duration_seconds / 60 * 10) / 10, // en minutos
      duracionSegundos: exam.duration_seconds
    }));
  };

  // Preparar datos para scatter duración vs puntuación
  const getScoreDurationData = () => {
    if (!stats?.history) return [];
    return stats.history.map((exam, index) => ({
      name: `Examen #${index + 1}`,
      duracion: Math.round(exam.duration_seconds / 60 * 10) / 10,
      puntuacion: parseFloat(exam.points),
      porcentaje: parseFloat(exam.percentage)
    }));
  };

  // Preparar datos para scatter sin responder vs duración
  const getUnansweredDurationData = () => {
    if (!stats?.history) return [];
    return stats.history.map((exam, index) => ({
      name: `Examen #${index + 1}`,
      duracion: Math.round(exam.duration_seconds / 60 * 10) / 10,
      sinResponder: exam.unanswered
    }));
  };

  // Eliminar un examen específico
  const deleteExam = (examId) => {
    const success = deleteExamResult(examId);
    if (success) {
      fetchStats(); // Refrescar datos
    }
    return success;
  };

  // Limpiar todo el historial
  const clearAll = () => {
    const success = clearAllHistory();
    if (success) {
      fetchStats(); // Refrescar datos
    }
    return success;
  };

  return {
    stats,
    loading,
    error,
    refetch: fetchStats,
    formatDuration,
    formatDate,
    getProgressionData,
    getDurationData,
    getScoreDurationData,
    getUnansweredDurationData,
    deleteExam,
    clearAll
  };
};
