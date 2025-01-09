@echo off
echo Mise a jour de World Political Map...

:: Aller dans le dossier du projet
cd /d %USERPROFILE%\Documents\world-political-map

:: Recuperer les dernieres modifications
echo Recuperation des mises a jour...
git pull origin main

:: Mettre a jour les dependances si necessaire
echo Mise a jour des dependances...
call npm install

:: Demarrer l'application
echo Demarrage de l'application...
call npm start

pause