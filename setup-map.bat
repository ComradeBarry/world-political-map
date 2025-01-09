@echo off
echo Configuration initiale du projet...

:: Aller dans Documents
cd /d %USERPROFILE%\Documents

:: Supprimer l'ancienne version si elle existe
echo Nettoyage de l'installation precedente...
if exist world-political-map (
    rd /s /q world-political-map
)

:: Creer un nouveau projet React avec TypeScript
echo Creation du projet React avec TypeScript...
call npx create-react-app@5.0.1 world-political-map --template typescript --use-npm
cd world-political-map

:: Force la version de React et des dependances
echo Mise a jour des versions de React...
call npm install --save --legacy-peer-deps react@^18.0.0 react-dom@^18.0.0

:: Installation des dependances de test
echo Installation des dependances de test...
call npm install --save-dev --legacy-peer-deps @types/jest @testing-library/react@^13.0.0 @testing-library/jest-dom @testing-library/user-event

:: Installation des autres dependances
echo Installation des autres dependances...
call npm install --save --legacy-peer-deps web-vitals leaflet recharts lucide-react
call npm install --save --legacy-peer-deps class-variance-authority clsx tailwind-merge
call npm install --save --legacy-peer-deps @radix-ui/react-dialog @radix-ui/react-slot @radix-ui/react-select

:: Installation de TypeScript et types
echo Installation de TypeScript...
call npm install --save-dev typescript@4.9.5 @types/node @types/react @types/react-dom

:: Installation de Tailwind
echo Installation de Tailwind...
call npm install -D tailwindcss postcss autoprefixer
call npx tailwindcss init -p

:: Configuration du projet
echo Configuration du projet...

:: Supprimer les fichiers de test par defaut
del src\App.test.tsx
del src\setupTests.ts
del src\reportWebVitals.ts
del src\logo.svg

:: Mettre a jour App.tsx
echo import React from 'react';> src\App.tsx
echo import './App.css';>> src\App.tsx
echo.>> src\App.tsx
echo function App() {>> src\App.tsx
echo   return (>> src\App.tsx
echo     ^<div className="App"^>>> src\App.tsx
echo       ^<h1^>World Political Map^</h1^>>> src\App.tsx
echo     ^</div^>>> src\App.tsx
echo   );>> src\App.tsx
echo }>> src\App.tsx
echo.>> src\App.tsx
echo export default App;>> src\App.tsx

:: Configuration de TypeScript
echo Configuration de TypeScript...
echo {> tsconfig.json
echo   "compilerOptions": {>> tsconfig.json
echo     "target": "es5",>> tsconfig.json
echo     "lib": ["dom", "dom.iterable", "esnext"],>> tsconfig.json
echo     "allowJs": true,>> tsconfig.json
echo     "skipLibCheck": true,>> tsconfig.json
echo     "esModuleInterop": true,>> tsconfig.json
echo     "allowSyntheticDefaultImports": true,>> tsconfig.json
echo     "strict": true,>> tsconfig.json
echo     "forceConsistentCasingInFileNames": true,>> tsconfig.json
echo     "noFallthroughCasesInSwitch": true,>> tsconfig.json
echo     "module": "esnext",>> tsconfig.json
echo     "moduleResolution": "node",>> tsconfig.json
echo     "resolveJsonModule": true,>> tsconfig.json
echo     "isolatedModules": true,>> tsconfig.json
echo     "noEmit": true,>> tsconfig.json
echo     "jsx": "react-jsx",>> tsconfig.json
echo     "baseUrl": ".",>> tsconfig.json
echo     "paths": {>> tsconfig.json
echo       "@/*": ["./src/*"]>> tsconfig.json
echo     }>> tsconfig.json
echo   },>> tsconfig.json
echo   "include": ["src"]>> tsconfig.json
echo }>> tsconfig.json

:: Demarrer l'application
echo Demarrage de l'application...
npm start

echo Configuration terminee !
pause