#!/bin/bash
# Inicializa a versão local do Email Builder
set -e
command -v node >/dev/null 2>&1 || { echo "Node.js nao encontrado"; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "npm nao encontrado"; exit 1; }

npm install
npm start
