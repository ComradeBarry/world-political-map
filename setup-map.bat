@echo off
echo Configuration initiale du projet...

:: Aller dans Documents
cd /d %USERPROFILE%\Documents

:: Supprimer l'ancienne version si elle existe
echo Nettoyage de l'installation precedente...
if exist world-political-map (
    rd /s /q world-political-map
)

:: Creer un nouveau projet React
echo Creation du projet React...
call npx create-react-app world-political-map
cd world-political-map

:: Configurer Git
echo Configuration de Git...
git init
git remote add origin https://github.com/ComradeBarry/world-political-map.git
git fetch origin
git reset --hard origin/main

:: Installer les dependances
echo Installation des dependances...
call npm install leaflet recharts lucide-react @radix-ui/react-slot
call npm install -D tailwindcss postcss autoprefixer

:: Demarrer l'application
echo Demarrage de l'application...
call npm start

echo Configuration terminee !
echo Vous pouvez maintenant utiliser update-map.bat pour les mises a jour futures.
pause