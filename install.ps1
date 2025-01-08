Write-Host "🌍 Installation de World Political Map..." -ForegroundColor Cyan

# Vérifier si Node.js est installé
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js n'est pas installé. Veuillez l'installer depuis https://nodejs.org/" -ForegroundColor Red
    exit
}

# Vérifier si Git est installé
if (!(Get-Command git -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Git n'est pas installé. Veuillez l'installer depuis https://git-scm.com/" -ForegroundColor Red
    exit
}

# Créer le dossier du projet
Write-Host "📁 Création du dossier du projet..." -ForegroundColor Yellow
New-Item -ItemType Directory -Force -Path world-political-map
Set-Location world-political-map

# Cloner le dépôt
Write-Host "📥 Clonage du dépôt..." -ForegroundColor Yellow
git clone https://github.com/ComradeBarry/world-political-map.git .

# Installer les dépendances
Write-Host "📦 Installation des dépendances..." -ForegroundColor Yellow
npm install

# Configuration de Tailwind
Write-Host "🎨 Configuration de Tailwind CSS..." -ForegroundColor Yellow
npx tailwindcss init -p

# Lancer l'application
Write-Host "🚀 Démarrage de l'application..." -ForegroundColor Green
npm start

Write-Host "✅ Installation terminée !" -ForegroundColor Green
Write-Host "L'application devrait s'ouvrir dans votre navigateur à l'adresse http://localhost:3000" -ForegroundColor Cyan