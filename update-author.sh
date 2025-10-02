#!/bin/bash

# Remplace "Kévin Merland" par "Gamaliel BENDEGUE" dans tout le projet
# Fonctionne sur les fichiers texte : code, docs, config, etc.

set -e

echo "🔄 Remplacement de 'Kévin Merland' par 'Gamaliel BENDEGUE'..."

# Liste des extensions à traiter
EXTENSIONS=("ts" "tsx" "js" "jsx" "md" "json" "html" "css" "txt" "yml" "yaml")

# Boucle sur chaque extension
for ext in "${EXTENSIONS[@]}"; do
    while IFS= read -r -d '' file; do
        sed -i "s/Kévin Merland/Gamaliel BENDEGUE/g" "$file"
        sed -i "s/Kévin MERLAND/Gamaliel BENDEGUE/g" "$file"
        sed -i "s/kevin merland/Gamaliel BENDEGUE/g" "$file"
        sed -i "s/Kevin Merland/Gamaliel BENDEGUE/g" "$file"
    done < <(find . -type f -name "*.$ext" -print0 2>/dev/null)
done

# Fichiers spécifiques sans extension ou nommés explicitement
SPECIAL_FILES=("LICENSE" "COPYRIGHT" "README.md" "package.json" "package-lock.json")
for file in "${SPECIAL_FILES[@]}"; do
    if [ -f "$file" ]; then
        sed -i "s/Kévin Merland/Gamaliel BENDEGUE/g" "$file"
        sed -i "s/Kévin MERLAND/Gamaliel BENDEGUE/g" "$file"
        sed -i "s/kevin merland/Gamaliel BENDEGUE/g" "$file"
        sed -i "s/Kevin Merland/Gamaliel BENDEGUE/g" "$file"
    fi
done

echo "✅ Remplacement terminé !"
echo "🔍 Vérifie les fichiers critiques (ex: LICENSE, README.md) pour confirmer."
