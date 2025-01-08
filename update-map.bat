@echo off
echo Mise a jour de World Political Map depuis GitHub...

:: Aller dans Documents
cd /d %USERPROFILE%\Documents

:: Verifier si le dossier existe deja
if exist world-political-map (
    echo Mise a jour du projet existant...
    cd world-political-map
    git pull origin main
) else (
    echo Clone du projet...
    git clone https://github.com/ComradeBarry/world-political-map.git
    cd world-political-map
)

:: Installer/mettre a jour les dependances
echo Installation des dependances...
call npm install

:: Demarrer l'application
echo Demarrage de l'application...
call npm start

pause