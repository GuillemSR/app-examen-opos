# Aplicación de Exámenes de Oposición

Aplicación web para practicar exámenes de oposición con preguntas reales.

## Características

- **20 preguntas** seleccionadas aleatoriamente de un pool de 305 preguntas
- **30 minutos** de duración por examen
- **Sistema de puntuación**: +1 por correcta, -0.25 por incorrecta, 0 por sin responder
- **Temporizador** con aviso visual cuando queda poco tiempo
- **Navegación** entre preguntas (anterior/siguiente)
- **Estado del examen** con mapa visual de preguntas respondidas
- **Pausa** del examen con posibilidad de continuar
- **Persistencia** del progreso en localStorage
- **Resultados detallados** con estadísticas completas
- **Revisión de incorrectas** mostrando la respuesta correcta
- **Diseño responsive** para móvil y escritorio

## Uso Local

### Requisitos
- Node.js 18+
- npm

### Instalación

1. Clona el repositorio
2. Instala las dependencias:
```bash
cd exam-app
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

4. Abre el navegador en `http://localhost:5173` (sin /exam-app/ al final)

## Añadir Nuevos Exámenes

Para añadir nuevos archivos JSON de exámenes:

1. Coloca los nuevos archivos `.json` en la carpeta `exams/`
2. Asegúrate de que tengan la estructura correcta:
```json
{
  "metadata": {
    "model": 1
  },
  "questions": [
    {
      "number": 1,
      "question": "Texto de la pregunta",
      "answers": {
        "a": "Opción A",
        "b": "Opción B",
        "c": "Opción C",
        "d": "Opción D"
      },
      "correct": ["a"]
    }
  ]
}
```

3. Ejecuta el script de procesamiento desde el directorio raíz:
```bash
node process-exams.js
```

4. Esto actualizará automáticamente el archivo `exam-app/public/exams.json` con todas las preguntas

## Deploy a GitHub Pages

1. Asegúrate de que el repositorio esté en GitHub

2. Edita `vite.config.js` y cambia la propiedad `base` al nombre de tu repositorio:
```js
base: '/nombre-de-tu-repo/'
```

3. Ejecuta el deploy:
```bash
npm run deploy
```

4. Configura GitHub Pages:
   - Ve a Settings > Pages
   - En "Source", selecciona la rama `gh-pages`
   - Guarda los cambios

5. Tu aplicación estará disponible en: `https://tu-usuario.github.io/nombre-de-tu-repo/`

## Estructura del Proyecto

```
exam-app/
├── public/
│   └── exams.json          # Todas las preguntas combinadas
├── src/
│   ├── components/         # Componentes React
│   │   ├── ExamSetup.jsx
│   │   ├── QuestionCard.jsx
│   │   ├── Timer.jsx
│   │   ├── Navigation.jsx
│   │   ├── ExamStatus.jsx
│   │   ├── PauseScreen.jsx
│   │   ├── FinishConfirmation.jsx
│   │   ├── Results.jsx
│   │   └── Review.jsx
│   ├── hooks/              # Custom hooks
│   │   ├── useExam.js
│   │   └── useTimer.js
│   ├── utils/              # Utilidades
│   │   ├── questionLoader.js
│   │   └── scoring.js
│   ├── App.jsx             # Componente principal
│   ├── main.jsx            # Entry point
│   └── index.css           # Estilos globales
├── vite.config.js          # Configuración de Vite
└── package.json
```

## Tecnologías Utilizadas

- **React 19** - Framework de UI
- **Vite** - Build tool
- **TailwindCSS** - Framework de CSS
- **LocalStorage** - Persistencia del estado del examen

## Licencia

MIT
