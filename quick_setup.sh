#!/bin/bash

# Script simples de setup para o Email Builder
# Instala dependências e sobe o ambiente em Docker

set -e

# Cores
GREEN="\033[0;32m"
RED="\033[0;31m"
NC="\033[0m"

log() {
  echo -e "${GREEN}$1${NC}"
}

err() {
  echo -e "${RED}Erro: $1${NC}" >&2
  exit 1
}

# Verificar dependências básicas
command -v node >/dev/null 2>&1 || err "Node.js não encontrado"
command -v npm >/dev/null 2>&1 || err "npm não encontrado"
if ! command -v docker >/dev/null 2>&1; then
  err "Docker não encontrado. Instale-o para usar a versão web-based"
fi

# Verificar docker-compose ou docker compose
if command -v docker-compose >/dev/null 2>&1; then
  DOCKER_COMPOSE="docker-compose"
elif docker compose version >/dev/null 2>&1; then
  DOCKER_COMPOSE="docker compose"
else
  err "Docker Compose não encontrado"
fi

log "Instalando dependências npm..."
npm install

log "Construindo imagem Docker..."
docker build -f dockerfile-email-builder.yaml -t email-builder:latest .

log "Subindo containers..."
$DOCKER_COMPOSE -f docker-compose-email-builder.yml up -d

log "Setup concluído. Acesse http://localhost"
