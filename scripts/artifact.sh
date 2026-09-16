#!/bin/bash
# Strip the document wrapper from index.html to make the fragment the Artifact tool publishes.
set -e
cd "$(dirname "$0")/.."
mkdir -p dist
{ sed -n '/<title>/,/<\/style>/p' index.html; sed -n '/<div id="arena">/,/<\/body>/p' index.html | sed '/<\/body>/d'; } > dist/artifact.html
echo "wrote dist/artifact.html ($(wc -c < dist/artifact.html) bytes)"
