@echo off
echo Mise a jour de World Political Map...

:: Aller dans le dossier du projet
cd /d %USERPROFILE%\Documents\world-political-map

:: Récupérer les dernières modifications
echo Recuperation des mises a jour...
git pull

:: Mettre à jour les dépendances si nécessaire
echo Mise a jour des dependances...
call npm install

:: Démarrer l'application
echo Demarrage de l'application...
call npm start

pause