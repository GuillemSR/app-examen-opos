import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Buscar automáticamente todos los archivos JSON en la carpeta exams/
const examsDir = path.join(__dirname, 'exams');
const examFiles = fs.readdirSync(examsDir)
  .filter(file => file.endsWith('.json'))
  .sort();

console.log(`Encontrados ${examFiles.length} archivos JSON de exámenes:\n`);

const allQuestions = [];

// Procesar cada archivo JSON
examFiles.forEach((filename) => {
  const filePath = path.join(examsDir, filename);
  
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const examData = JSON.parse(fileContent);
    
    // Añadir cada pregunta con el modelo de origen
    if (examData.questions && Array.isArray(examData.questions)) {
      examData.questions.forEach((question) => {
        allQuestions.push({
          ...question,
          examModel: filename.replace('.json', ''),
          modelId: examData.metadata?.model || 'Desconocido'
        });
      });
    }
    
    console.log(`✓ Procesado: ${filename} - ${examData.questions.length} preguntas`);
  } catch (error) {
    console.error(`✗ Error procesando ${filename}:`, error.message);
  }
});

// Crear el objeto final
const combinedData = {
  totalQuestions: allQuestions.length,
  exams: examFiles.map((f) => f.replace('.json', '')),
  questions: allQuestions
};

// Guardar el archivo combinado
const outputPath = path.join(__dirname, 'exam-app', 'public', 'exams.json');
fs.writeFileSync(outputPath, JSON.stringify(combinedData, null, 2), 'utf-8');

console.log(`\n✓ Archivo combinado creado: exams.json`);
console.log(`✓ Total de preguntas: ${allQuestions.length}`);
