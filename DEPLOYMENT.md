# Guía de Deployment a GitHub Pages

## Paso 1: Preparar el repositorio en GitHub

1. Ve a GitHub y crea un nuevo repositorio (por ejemplo, `test-opos-aux`)
2. NO inicialices con README, .gitignore o licencia (ya tenemos estos archivos)

## Paso 2: Inicializar Git y subir al repositorio

Desde el directorio raíz (`D:\Projectos\Test Opos Aux`), ejecuta:

```bash
# Inicializar repositorio git
git init

# Añadir todos los archivos
git add .

# Hacer el primer commit
git commit -m "Initial commit: Exam app with 305 questions"

# Añadir el remote (reemplaza TU_USUARIO y NOMBRE_REPO con tus valores)
git remote add origin https://github.com/TU_USUARIO/NOMBRE_REPO.git

# Cambiar a la rama main (GitHub usa main por defecto ahora)
git branch -M main

# Subir a GitHub
git push -u origin main
```

## Paso 3: Actualizar la configuración de Vite (IMPORTANTE)

1. Abre `exam-app/vite.config.js`
2. En la línea que dice `const base = command === 'serve' ? '/' : '/exam-app/';`
3. Cambia `/exam-app/` por el nombre exacto de tu repositorio de GitHub

Ejemplo, si tu repositorio se llama `test-opos-aux`:
```js
const base = command === 'serve' ? '/' : '/test-opos-aux/';
```

**NOTA**: La configuración automáticamente usa `/` para desarrollo local y el nombre de tu repo para producción.

4. Guarda el archivo

## Paso 4: Deploy a GitHub Pages

Desde el directorio `exam-app`:

```bash
cd exam-app

# Construir y desplegar
npm run deploy
```

Este comando:
- Construye la aplicación para producción
- Crea una rama `gh-pages`
- Sube los archivos compilados a esa rama

## Paso 5: Configurar GitHub Pages

1. Ve a tu repositorio en GitHub
2. Click en "Settings"
3. En el menú lateral, click en "Pages"
4. En "Source", selecciona la rama `gh-pages` y la carpeta `/ (root)`
5. Click en "Save"

## Paso 6: Acceder a tu aplicación

Después de unos minutos, tu aplicación estará disponible en:

```
https://TU_USUARIO.github.io/NOMBRE_REPO/
```

## Entendiendo las Ramas Git

### Rama `main` (tu rama de trabajo)
- Contiene todo el código fuente del proyecto
- **Aquí haces TODOS los cambios** (editar código, añadir exámenes, etc.)
- Aquí haces commits y push
- Es tu rama principal de desarrollo

### Rama `gh-pages` (automática - NO TOCAR)
- **Creada automáticamente** por `npm run deploy`
- Solo contiene los archivos compilados (contenido de `dist/`)
- GitHub Pages sirve la aplicación desde aquí
- **NUNCA edites esta rama manualmente**
- Se actualiza automáticamente cada vez que ejecutas `npm run deploy`

### Flujo Visual

```
main (código fuente)
  ↓
  git commit & push
  ↓
  npm run deploy (desde exam-app/)
  ↓
gh-pages (build compilado)
  ↓
GitHub Pages (https://usuario.github.io/repo/)
```

### Comandos útiles

```bash
# Ver en qué rama estás
git branch

# Ver cambios pendientes
git status

# Cambiar a main (si por alguna razón estás en otra rama)
git checkout main
```

## Actualizaciones futuras

### Opción 1: Solo deploy rápido (cambios en la app)

Si solo modificaste código de la aplicación y quieres verlo online rápido:

```bash
cd exam-app
npm run deploy
```

Esto despliega directamente a GitHub Pages sin hacer commit a Git.

### Opción 2: Cambios + Guardar en Git (RECOMENDADO)

Para guardar los cambios en el repositorio y desplegar:

```bash
# 1. Verificar que estás en main
git branch

# 2. Añadir los cambios
git add .

# 3. Hacer commit
git commit -m "Descripción de los cambios"

# 4. Subir a GitHub (rama main)
git push

# 5. Desplegar a GitHub Pages
cd exam-app
npm run deploy
```

### Opción 3: Añadir nuevos exámenes

Cuando añadas nuevos archivos JSON de exámenes:

```bash
# 1. Coloca los nuevos archivos .json en la carpeta exams/

# 2. Ejecuta el script de procesamiento
node process-exams.js

# 3. Commit y push
git add .
git commit -m "Añadidos nuevos exámenes"
git push

# 4. Redeploy
cd exam-app
npm run deploy
```

### Resumen Rápido

| Acción | Comandos |
|--------|----------|
| Solo deploy | `cd exam-app && npm run deploy` |
| Cambios + deploy | `git add . && git commit -m "msg" && git push && cd exam-app && npm run deploy` |
| Nuevos exámenes | `node process-exams.js` + commit + deploy |

**IMPORTANTE**: Los cambios en GitHub Pages tardan 1-2 minutos en verse. Usa Ctrl+F5 para refrescar sin caché.

## Solución de problemas

### Error: "Failed to load resource: the server responded with a status of 404"

- Asegúrate de que la propiedad `base` en `vite.config.js` coincida exactamente con el nombre de tu repositorio
- El nombre debe incluir las barras: `/nombre-repo/`

### Error: "Page not found" en GitHub Pages

- Verifica que hayas configurado GitHub Pages para usar la rama `gh-pages`
- Espera unos minutos para que GitHub procese el despliegue

### La aplicación se ve pero no carga las preguntas

- Revisa que el archivo `exams.json` esté en la carpeta `public/`
- Verifica que el script `process-exams.js` se haya ejecutado correctamente

## Notas importantes

- La aplicación usa LocalStorage para guardar el progreso del examen
- Los datos se guardan en el navegador del usuario
- No hay backend ni base de datos
- Todas las preguntas se cargan desde el archivo `exams.json`
