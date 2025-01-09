@echo off
echo Configuration initiale du projet...

:: Aller dans Documents
cd /d %USERPROFILE%\Documents

:: Supprimer l'ancienne version si elle existe
echo Nettoyage de l'installation precedente...
if exist world-political-map (
    rd /s /q world-political-map
)

:: Cloner le projet avec la bonne URL
echo Clonage du projet...
git clone https://github.com/ComradeBarry/world-political-map.git
cd world-political-map

:: Configurer le remote origin
echo Configuration de Git...
git remote set-url origin https://github.com/ComradeBarry/world-political-map.git

:: Installer les dépendances
echo Installation des dependances...
call npm install leaflet recharts lucide-react @radix-ui/react-slot
call npm install -D tailwindcss postcss autoprefixer

:: Démarrer l'application
echo Demarrage de l'application...
call npm start

echo Configuration terminee !
echo Vous pouvez maintenant utiliser update-map.bat pour les mises a jour futures.
pause