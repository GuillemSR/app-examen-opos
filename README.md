# Test Oposicions Auxiliar Administratiu

Aplicacion web para practicar examenes de oposiciones con preguntas reales.

## Estructura del Proyecto

```
Test Opos Aux/
├── exam-app/           # Aplicacion React (Vite + TailwindCSS)
│   ├── src/            # Codigo fuente
│   ├── public/         # Archivos estaticos (exams.json generado)
│   └── README.md       # Instrucciones de la aplicacion
├── exams/              # JSONs de examenes fuente
├── pdfs/               # PDFs originales de los examenes
├── process-exams.js    # Script para combinar examenes
└── DEPLOYMENT.md       # Guia de deployment a GitHub Pages
```

## Inicio Rapido

```bash
# 1. Instalar dependencias
cd exam-app
npm install

# 2. Iniciar servidor de desarrollo
npm run dev

# 3. Abrir http://localhost:5173
```

## Anadir Nuevos Examenes

1. Coloca el archivo `.json` en la carpeta `exams/`
2. Ejecuta `node process-exams.js` desde la raiz
3. Los examenes se combinaran en `exam-app/public/exams.json`

## Deploy a GitHub Pages

Ver [DEPLOYMENT.md](DEPLOYMENT.md) para instrucciones completas.

## Tecnologias

- React 19
- Vite
- TailwindCSS
- Recharts (graficos)
