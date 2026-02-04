import React, { useState, useEffect } from 'react';
import { useExam } from './hooks/useExam';
import { useTimer } from './hooks/useTimer';
import ExamSetup from './components/ExamSetup';
import QuestionCard from './components/QuestionCard';
import Navigation from './components/Navigation';
import Timer from './components/Timer';
import ExamStatus from './components/ExamStatus';
import PauseScreen from './components/PauseScreen';
import FinishConfirmation from './components/FinishConfirmation';
import Results from './components/Results';
import Review from './components/Review';
import Statistics from './components/Statistics';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const exam = useExam();
  const [showStatus, setShowStatus] = useState(false);
  const [showFinishConfirm, setShowFinishConfirm] = useState(false);
  const [viewMode, setViewMode] = useState('exam'); // 'exam', 'results', 'review', 'statistics'
  const [hasRestoredExam, setHasRestoredExam] = useState(false);
  const getInitialTheme = () => {
    if (typeof window === 'undefined') return 'light';
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') return stored;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  };
  const [theme, setTheme] = useState(getInitialTheme);

  // Timer con 30 minutos (1800 segundos)
  const timer = useTimer(1800, exam.examState === 'paused' || showStatus, () => {
    // Cuando el tiempo se acaba
    exam.finishExam(0); // 0 segundos restantes
  });

  // Verificar si hay un examen guardado al cargar
  useEffect(() => {
    const savedState = localStorage.getItem('examState');
    if (savedState) {
      setHasRestoredExam(true);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Manejar inicio de examen
  const handleStartExam = () => {
    exam.startExam();
    timer.reset();
    timer.start();
    setViewMode('exam');
  };

  // Manejar restaurar examen
  const handleRestoreExam = () => {
    const restored = exam.restoreExam();
    if (restored) {
      timer.start();
      setViewMode('exam');
    }
  };

  // Manejar respuesta del usuario
  const handleAnswerChange = (answer) => {
    exam.saveAnswer(exam.currentQuestionIndex, answer);
  };

  // Manejar navegación
  const handlePrevious = () => {
    exam.goToPreviousQuestion();
  };

  const handleNext = () => {
    exam.goToNextQuestion();
  };

  // Manejar pausa
  const handlePause = () => {
    exam.pauseExam();
    timer.pause();
  };

  // Manejar reanudar
  const handleResume = () => {
    exam.resumeExam();
    timer.start();
  };

  // Manejar abandono
  const handleAbandon = () => {
    exam.abandonExam();
    timer.reset();
    setHasRestoredExam(false);
  };

  // Manejar finalizar examen
  const handleFinishExam = () => {
    setShowFinishConfirm(true);
  };

  const handleConfirmFinish = () => {
    setShowFinishConfirm(false);
    timer.pause();
    exam.finishExam(timer.timeRemaining);
    setViewMode('results');
  };

  // Manejar revisión
  const handleReview = () => {
    setViewMode('review');
  };

  const handleBackToResults = () => {
    setViewMode('results');
  };

  const handleNewExam = () => {
    setViewMode('exam');
    handleStartExam();
  };

  // Manejar volver al inicio (home)
  const handleGoHome = () => {
    exam.abandonExam();
    timer.reset();
    setHasRestoredExam(false);
    setViewMode('exam');
  };

  // Manejar estadísticas
  const handleShowStats = () => {
    setViewMode('statistics');
  };

  const handleBackFromStats = () => {
    setViewMode('exam');
  };

  // Pantalla de estadísticas
  if (viewMode === 'statistics') {
    return (
      <>
        <Statistics onBack={handleBackFromStats} />
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </>
    );
  }

  // Renderizado condicional según el estado
  if (exam.loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center">
        <div className="text-white text-center">
          <svg className="animate-spin h-12 w-12 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-xl font-semibold">Cargando preguntas...</p>
        </div>
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </div>
    );
  }

  // Pantalla de configuración inicial
  if (exam.examState === 'setup') {
    return (
      <>
        <ExamSetup 
          onStart={handleStartExam}
          loading={exam.loading}
          hasRestoredExam={hasRestoredExam}
          onRestore={handleRestoreExam}
          onShowStats={handleShowStats}
        />
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </>
    );
  }

  // Pantalla de pausa
  if (exam.examState === 'paused') {
    return (
      <>
        <PauseScreen 
          onResume={handleResume}
          onAbandon={handleAbandon}
          formatTime={timer.formatTime}
          timeRemaining={timer.timeRemaining}
        />
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </>
    );
  }

  // Pantalla de resultados
  if (exam.examState === 'finished' && viewMode === 'results') {
    return (
      <>
        <Results 
          results={exam.results}
          onReview={handleReview}
          onNewExam={handleNewExam}
          onHome={handleGoHome}
        />
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </>
    );
  }

  // Pantalla de revisión
  if (exam.examState === 'finished' && viewMode === 'review') {
    return (
      <>
        <Review 
          incorrectQuestions={exam.results.incorrectQuestions}
          onBackToResults={handleBackToResults}
        />
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </>
    );
  }

  // Pantalla principal del examen
  const stats = exam.getExamStats();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-950">
      {/* Header con timer */}
      <div className="bg-white dark:bg-slate-900 shadow-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-slate-100">
              Examen de Oposición
            </h1>
            <p className="text-sm text-gray-600 dark:text-slate-300">
              Pregunta {exam.currentQuestionIndex + 1} de {exam.examQuestions.length}
            </p>
          </div>
          <Timer 
            formatTime={timer.formatTime}
            timeRemaining={timer.timeRemaining}
          />
        </div>
      </div>

      {/* Contenido principal */}
      <div className="max-w-4xl mx-auto px-4 py-6 md:py-8">
        <div className="space-y-6">
          {/* Tarjeta de pregunta */}
          <QuestionCard 
            question={exam.currentQuestion}
            questionNumber={exam.currentQuestionIndex + 1}
            totalQuestions={exam.examQuestions.length}
            userAnswer={exam.userAnswers[exam.currentQuestionIndex]}
            onAnswerChange={handleAnswerChange}
          />

          {/* Navegación */}
          <Navigation 
            onPrevious={handlePrevious}
            onNext={handleNext}
            onShowStatus={() => setShowStatus(true)}
            onPause={handlePause}
            canGoPrevious={exam.currentQuestionIndex > 0}
            canGoNext={exam.currentQuestionIndex < exam.examQuestions.length - 1}
            currentQuestion={exam.currentQuestionIndex + 1}
            totalQuestions={exam.examQuestions.length}
          />

          {/* Botón de finalizar */}
          <button
            onClick={handleFinishExam}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Finalizar Examen
          </button>
        </div>
      </div>

      {/* Modales */}
      {showStatus && (
        <ExamStatus 
          stats={stats}
          timeRemaining={timer.timeRemaining}
          formatTime={timer.formatTime}
          questions={exam.examQuestions}
          userAnswers={exam.userAnswers}
          onClose={() => setShowStatus(false)}
          onGoToQuestion={exam.goToQuestion}
        />
      )}

      {showFinishConfirm && (
        <FinishConfirmation 
          stats={stats}
          onConfirm={handleConfirmFinish}
          onCancel={() => setShowFinishConfirm(false)}
        />
      )}
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
    </div>
  );
}

export default App;
