#!/bin/bash

echo "🌍 Installation de World Political Map..."

# Vérifier si Node.js est installé
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Installation de Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi

# Vérifier si npm est installé
if ! command -v npm &> /dev/null; then
    echo "❌ npm n'est pas installé. Installation de npm..."
    sudo apt-get install -y npm
fi

# Créer le dossier du projet
echo "📁 Création du dossier du projet..."
mkdir -p world-political-map
cd world-political-map

# Cloner le dépôt
echo "📥 Clonage du dépôt..."
git clone https://github.com/ComradeBarry/world-political-map.git .

# Installer les dépendances
echo "📦 Installation des dépendances..."
npm install

# Configuration de Tailwind
echo "🎨 Configuration de Tailwind CSS..."
npx tailwindcss init -p

# Lancer l'application
echo "🚀 Démarrage de l'application..."
npm start

echo "✅ Installation terminée !"
echo "L'application devrait s'ouvrir dans votre navigateur à l'adresse http://localhost:3000"