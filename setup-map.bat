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
call npx create-react-app@latest world-political-map --template typescript --use-npm
cd world-political-map

:: Installation des dépendances principales
echo Installation des dependances principales...
call npm install react@latest react-dom@latest
call npm install web-vitals --save
call npm install leaflet recharts lucide-react

:: Installation des dépendances de développement
echo Installation des dependances de developpement...
call npm install -D tailwindcss postcss autoprefixer

:: Installation de shadcn/ui
echo Installation de shadcn/ui...
call npx shadcn-ui@latest init

:: Ajout des composants shadcn/ui nécessaires
echo Ajout des composants shadcn/ui...
call npx shadcn-ui@latest add card
call npx shadcn-ui@latest add select

:: Configurer Git
echo Configuration de Git...
git init
git remote add origin https://github.com/ComradeBarry/world-political-map.git
git fetch origin
git reset --hard origin/main

:: Installation de react-scripts globalement
echo Installation de react-scripts...
call npm install -g react-scripts

:: Demarrer l'application
echo Demarrage de l'application...
npx react-scripts start

echo Configuration terminee !
echo Vous pouvez maintenant utiliser update-map.bat pour les mises a jour futures.
pause