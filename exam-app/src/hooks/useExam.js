import { useState, useEffect } from 'react';
import { loadQuestions, getRandomQuestions } from '../utils/questionLoader';
import { calculateScore } from '../utils/scoring';
import { saveExamResult } from '../services/storage';

// Hook principal para gestionar el estado del examen
export const useExam = () => {
  const [allQuestions, setAllQuestions] = useState([]);
  const [examQuestions, setExamQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [examState, setExamState] = useState('setup'); // setup, active, paused, finished
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [examStartTime, setExamStartTime] = useState(null);

  // Cargar todas las preguntas al inicio
  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      const questions = await loadQuestions();
      setAllQuestions(questions);
      setLoading(false);
    };
    fetchQuestions();
  }, []);

  // Iniciar un nuevo examen
  const startExam = () => {
    const randomQuestions = getRandomQuestions(allQuestions, 20);
    setExamQuestions(randomQuestions);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setResults(null);
    setExamState('active');
    setExamStartTime(Date.now());
    
    // Guardar en localStorage
    saveExamState(randomQuestions, {}, 0, 'active');
  };

  // Guardar respuesta del usuario
  const saveAnswer = (questionIndex, answer) => {
    const newAnswers = {
      ...userAnswers,
      [questionIndex]: answer
    };
    setUserAnswers(newAnswers);
    
    // Guardar en localStorage
    saveExamState(examQuestions, newAnswers, currentQuestionIndex, examState);
  };

  // Navegar a la pregunta anterior
  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Navegar a la siguiente pregunta
  const goToNextQuestion = () => {
    if (currentQuestionIndex < examQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Ir a una pregunta específica
  const goToQuestion = (index) => {
    if (index >= 0 && index < examQuestions.length) {
      setCurrentQuestionIndex(index);
    }
  };

  // Pausar examen
  const pauseExam = () => {
    setExamState('paused');
    saveExamState(examQuestions, userAnswers, currentQuestionIndex, 'paused');
  };

  // Reanudar examen
  const resumeExam = () => {
    setExamState('active');
    saveExamState(examQuestions, userAnswers, currentQuestionIndex, 'active');
  };

  // Finalizar examen
  const finishExam = (timeRemaining = 0) => {
    const score = calculateScore(examQuestions, userAnswers);
    setResults(score);
    setExamState('finished');
    
    // Calcular duración del examen (30 min = 1800 seg - tiempo restante)
    const durationSeconds = 1800 - timeRemaining;
    
    // Preparar detalle de preguntas para guardar
    const questionsDetail = examQuestions.map((question, index) => {
      const userAnswer = userAnswers[index] || [];
      const correctAnswers = question.correct.sort();
      const userAnswersSorted = [...userAnswer].sort();
      const wasCorrect = 
        correctAnswers.length === userAnswersSorted.length &&
        correctAnswers.every((ans, idx) => ans === userAnswersSorted[idx]);
      
      return {
        id: question.id || `q-${index}`,
        text: question.question,
        answers: question.answers, // Guardar las opciones para mostrar en estadísticas
        userAnswer: userAnswer,
        correctAnswer: question.correct,
        wasCorrect: wasCorrect
      };
    });

    // Guardar en localStorage
    try {
      saveExamResult({
        durationSeconds,
        totalQuestions: examQuestions.length,
        correct: score.correct,
        incorrect: score.incorrect,
        unanswered: score.unanswered,
        points: score.points,
        percentage: parseFloat(score.percentage),
        questionsDetail
      });
      console.log('Examen guardado correctamente');
    } catch (error) {
      console.error('Error guardando examen:', error);
    }
    
    // Limpiar localStorage
    localStorage.removeItem('examState');
  };

  // Guardar estado en localStorage
  const saveExamState = (questions, answers, questionIndex, state) => {
    const examData = {
      questions,
      answers,
      currentQuestionIndex: questionIndex,
      state,
      startTime: examStartTime,
      timestamp: Date.now()
    };
    localStorage.setItem('examState', JSON.stringify(examData));
  };

  // Restaurar examen desde localStorage
  const restoreExam = () => {
    const savedState = localStorage.getItem('examState');
    if (savedState) {
      try {
        const examData = JSON.parse(savedState);
        setExamQuestions(examData.questions);
        setUserAnswers(examData.answers);
        setCurrentQuestionIndex(examData.currentQuestionIndex);
        setExamState(examData.state);
        setExamStartTime(examData.startTime || Date.now());
        return true;
      } catch (error) {
        console.error('Error restaurando examen:', error);
        return false;
      }
    }
    return false;
  };

  // Abandonar examen
  const abandonExam = () => {
    setExamState('setup');
    setExamQuestions([]);
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setResults(null);
    localStorage.removeItem('examState');
  };

  // Obtener estadísticas del examen
  const getExamStats = () => {
    const answered = Object.keys(userAnswers).filter(
      key => userAnswers[key] && userAnswers[key].length > 0
    ).length;
    const unanswered = examQuestions.length - answered;
    
    return {
      total: examQuestions.length,
      answered,
      unanswered
    };
  };

  return {
    loading,
    examState,
    examQuestions,
    currentQuestionIndex,
    currentQuestion: examQuestions[currentQuestionIndex],
    userAnswers,
    results,
    startExam,
    saveAnswer,
    goToPreviousQuestion,
    goToNextQuestion,
    goToQuestion,
    pauseExam,
    resumeExam,
    finishExam,
    abandonExam,
    restoreExam,
    getExamStats
  };
};
