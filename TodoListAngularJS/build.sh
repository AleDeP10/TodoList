#!/bin/bash

echo "🔧 Avvio build frontend..."

# 1. Pulizia dist/
rm -rf dist
mkdir dist

# 2. Compila lo SCSS
echo "🎨 Compilazione SCSS → CSS"
sass styles/style.scss dist/style.css

# 3. Copia file statici
echo "📦 Copia file HTML, JS, assets"
cp index.html dist/
cp -r controllers dist/
cp -r services dist/
cp -r store dist/
cp lib/ng-redux.min.js dist/lib/ng-redux.min.js

# 4. (Facoltativo) Copia immagini, icone, ecc.
# cp -r assets dist/

echo "✅ Build completata. Trovi tutto in /dist"
