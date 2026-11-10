# GameScope

Aplicación web con dos módulos: **Game Checker** (orientación de compatibilidad de PC) y **Game Chat** (asistente limitado a videojuegos).

## Requisitos
- Node.js 20+
- Una API key de Gemini

## Ejecutar localmente
1. Instala Node.js.
2. En esta carpeta ejecuta `npm install`.
3. Copia `.env.example` a `.env` y añade tu clave nueva de Gemini.
4. Ejecuta `npm start`.
5. Abre `http://localhost:3000`.

En Windows PowerShell puedes usar:
```powershell
Copy-Item .env.example .env
npm install
npm start
```

## Publicar en Render desde GitHub
1. Sube el contenido de esta carpeta a un repositorio GitHub llamado `GameScope`.
2. En Render elige **New + → Web Service** y conecta ese repositorio.
3. Render detectará `render.yaml`; también puedes configurar:
   - Build command: `npm install`
   - Start command: `npm start`
4. En **Environment** crea `GEMINI_API_KEY` con tu clave NUEVA. No la escribas en el código ni en GitHub.
5. Despliega. Render te dará una URL pública `https://...onrender.com`.

## Seguridad importante
La clave de Gemini debe guardarse únicamente como variable de entorno privada en Render. La clave compartida accidentalmente en un chat debe revocarse/rotarse en Google AI Studio y sustituirse por una nueva. No reutilices la clave expuesta.

## Alcance y precisión
Las evaluaciones de compatibilidad son orientativas generadas por IA, no benchmarks ni pruebas reales. Para resultados más precisos hacen falta modelos exactos, VRAM, resolución, ajustes, versión del juego y benchmarks fiables. El catálogo inicial contiene ejemplos; el análisis acepta cualquier juego escrito por el usuario.
