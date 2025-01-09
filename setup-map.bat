@echo off
echo Configuration initiale du projet...

:: Aller dans Documents
cd /d %USERPROFILE%\Documents

:: Supprimer l'ancienne version si elle existe
echo Nettoyage de l'installation precedente...
if exist world-political-map (
    rd /s /q world-political-map
)

:: Créer un nouveau projet React avec TypeScript
echo Creation du projet React avec TypeScript...
call npx create-react-app@latest world-political-map --template typescript
cd world-political-map

:: Installation des dépendances de base
echo Installation des dependances principales...
call npm install react@latest react-dom@latest
call npm install leaflet recharts lucide-react
call npm install class-variance-authority clsx tailwind-merge
call npm install @radix-ui/react-dialog @radix-ui/react-slot @radix-ui/react-select

:: Installation des dépendances de développement
echo Installation des dependances de developpement...
call npm install -D tailwindcss postcss autoprefixer @types/node @types/react @types/react-dom typescript

:: Configuration de Tailwind CSS
echo Configuration de Tailwind CSS...
call npx tailwindcss init -p
echo module.exports = {> tailwind.config.js
echo   darkMode: ["class"],>> tailwind.config.js
echo   content: ["./src/**/*.{ts,tsx}"],>> tailwind.config.js
echo   theme: {>> tailwind.config.js
echo     extend: {},>> tailwind.config.js
echo   },>> tailwind.config.js
echo   plugins: [],>> tailwind.config.js
echo };>> tailwind.config.js

:: Création des dossiers components/ui
echo Creation de la structure des composants...
mkdir src\components\ui

:: Configuration de TypeScript
echo Configuration de TypeScript...
echo {> tsconfig.json
echo   "compilerOptions": {>> tsconfig.json
echo     "baseUrl": ".",>> tsconfig.json
echo     "paths": {>> tsconfig.json
echo       "@/*": ["./src/*"]>> tsconfig.json
echo     },>> tsconfig.json
echo     "target": "es5",>> tsconfig.json
echo     "lib": ["dom", "dom.iterable", "esnext"],>> tsconfig.json
echo     "allowJs": true,>> tsconfig.json
echo     "skipLibCheck": true,>> tsconfig.json
echo     "strict": true,>> tsconfig.json
echo     "forceConsistentCasingInFileNames": true,>> tsconfig.json
echo     "noEmit": true,>> tsconfig.json
echo     "esModuleInterop": true,>> tsconfig.json
echo     "module": "esnext",>> tsconfig.json
echo     "moduleResolution": "node",>> tsconfig.json
echo     "resolveJsonModule": true,>> tsconfig.json
echo     "isolatedModules": true,>> tsconfig.json
echo     "jsx": "react-jsx",>> tsconfig.json
echo     "incremental": true>> tsconfig.json
echo   },>> tsconfig.json
echo   "include": ["src"]>> tsconfig.json
echo }>> tsconfig.json

:: Configuration des composants shadcn/ui
echo Configuration des composants shadcn/ui...
mkdir src\components\ui\card
mkdir src\components\ui\select

:: Démarrer l'application
echo Demarrage de l'application...
npm start

echo Configuration terminee !
pause