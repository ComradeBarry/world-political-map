@echo off
echo Installation des composants UI...

cd %USERPROFILE%\Documents\world-political-map

:: Installation des composants Card
echo Installation du composant Card...
npx shadcn-ui@latest add card

:: Installation des composants Select
echo Installation du composant Select...
npx shadcn-ui@latest add select

echo Installation des composants terminee !
pause