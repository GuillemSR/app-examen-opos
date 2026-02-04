// Cargar y mezclar preguntas aleatoriamente
export const loadQuestions = async () => {
  try {
    // Usar BASE_URL para que funcione en desarrollo y producción
    const response = await fetch(`${import.meta.env.BASE_URL}exams.json`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.questions;
  } catch (error) {
    console.error('Error cargando preguntas:', error);
    return [];
  }
};

// Obtener N preguntas aleatorias
export const getRandomQuestions = (questions, count = 20) => {
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Formatear el nombre del archivo para mostrar
export const formatExamFilename = (examModel) => {
  // Convertir el nombre del archivo en algo más legible
  return examModel
    .replace(/_/g, ' ')
    .replace(/\d{4} \d+ (OP|PIE|borsa)/, 'Examen $1')
    .substring(0, 60);
};
