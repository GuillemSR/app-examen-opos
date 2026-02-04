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

## Actualizaciones futuras

Cada vez que hagas cambios en el código:

```bash
# 1. Añadir los cambios
git add .

# 2. Hacer commit
git commit -m "Descripción de los cambios"

# 3. Subir a GitHub
git push

# 4. Desplegar de nuevo (desde exam-app/)
cd exam-app
npm run deploy
```

## Añadir nuevos exámenes

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
