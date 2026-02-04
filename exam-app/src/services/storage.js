// Servicio de almacenamiento local para historial de exámenes

const STORAGE_KEY = 'examHistory';

// Obtener historial de exámenes
export const getExamHistory = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error('Error leyendo historial:', e);
    return [];
  }
};

// Guardar resultado de examen
export const saveExamResult = (examData) => {
  try {
    const history = getExamHistory();
    const newExam = {
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      duration_seconds: examData.durationSeconds,
      total_questions: examData.totalQuestions,
      correct: examData.correct,
      incorrect: examData.incorrect,
      unanswered: examData.unanswered,
      points: examData.points,
      percentage: examData.percentage,
      questions_detail: examData.questionsDetail
    };
    history.push(newExam);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    console.log('Examen guardado correctamente');
    return newExam;
  } catch (e) {
    console.error('Error guardando examen:', e);
    throw e;
  }
};

// Obtener estadísticas agregadas
export const getAggregatedStats = () => {
  const history = getExamHistory();
  
  if (!history || history.length === 0) {
    return null;
  }

  const totalExams = history.length;
  const avgPoints = history.reduce((sum, e) => sum + parseFloat(e.points || 0), 0) / totalExams;
  const avgPercentage = history.reduce((sum, e) => sum + parseFloat(e.percentage || 0), 0) / totalExams;
  const avgDuration = history.reduce((sum, e) => sum + (e.duration_seconds || 0), 0) / totalExams;
  const bestExam = history.reduce((best, e) => parseFloat(e.percentage || 0) > parseFloat(best.percentage || 0) ? e : best);
  const worstExam = history.reduce((worst, e) => parseFloat(e.percentage || 0) < parseFloat(worst.percentage || 0) ? e : worst);

  // Calcular top preguntas falladas
  const failedQuestions = {};
  history.forEach(exam => {
    if (exam.questions_detail) {
      exam.questions_detail.forEach(q => {
        if (!q.wasCorrect && q.userAnswer && q.userAnswer.length > 0) {
          const key = q.text ? q.text.substring(0, 100) : q.id;
          if (!failedQuestions[key]) {
            failedQuestions[key] = {
              text: q.text || 'Pregunta sin texto',
              answers: q.answers || null, // Opciones de respuesta
              correctAnswer: q.correctAnswer || [], // Respuesta correcta
              count: 0,
              id: q.id
            };
          }
          failedQuestions[key].count++;
        }
      });
    }
  });

  const topFailed = Object.values(failedQuestions)
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  return {
    totalExams,
    avgPoints: avgPoints.toFixed(2),
    avgPercentage: avgPercentage.toFixed(2),
    avgDuration: Math.round(avgDuration),
    bestExam,
    worstExam,
    topFailed,
    history
  };
};

// Eliminar un examen del historial
export const deleteExamResult = (examId) => {
  try {
    const history = getExamHistory();
    const filtered = history.filter(e => e.id !== examId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  } catch (e) {
    console.error('Error eliminando examen:', e);
    return false;
  }
};

// Limpiar todo el historial
export const clearAllHistory = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (e) {
    console.error('Error limpiando historial:', e);
    return false;
  }
};

// Exportar historial a JSON
export const exportHistory = () => {
  const history = getExamHistory();
  const dataStr = JSON.stringify(history, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `exam-history-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

// Importar historial desde JSON
export const importHistory = (jsonData) => {
  try {
    const imported = JSON.parse(jsonData);
    if (!Array.isArray(imported)) {
      throw new Error('Formato inválido');
    }
    const current = getExamHistory();
    const merged = [...current, ...imported];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    return merged.length;
  } catch (e) {
    console.error('Error importando historial:', e);
    throw e;
  }
};
