@echo off
echo Installation de World Political Map...

:: Vérifier si Node.js est installé
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Node.js n'est pas installe. Merci de l'installer depuis https://nodejs.org/
    pause
    exit
)

:: Vérifier si Git est installé
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo Git n'est pas installe. Merci de l'installer depuis https://git-scm.com/
    pause
    exit
)

:: Créer le dossier du projet
echo Creation du dossier du projet...
mkdir world-political-map
cd world-political-map

:: Cloner le dépôt
echo Clonage du depot...
git clone https://github.com/ComradeBarry/world-political-map.git .

:: Installer les dépendances
echo Installation des dependances...
call npm install

:: Configuration de Tailwind
echo Configuration de Tailwind CSS...
call npx tailwindcss init -p

:: Lancer l'application
echo Demarrage de l'application...
call npm start

echo Installation terminee !
echo L'application devrait s'ouvrir dans votre navigateur
pause