#!/bin/bash

# 🚀 Script de Deploy - Email Builder
# Para VPS Ubuntu com suporte a Mac M3

set -e

echo "🚀 Iniciando deploy do Email Builder..."

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para log colorido
log() {
    echo -e "${GREEN}[$(date +'%Y-%m-%d %H:%M:%S')] $1${NC}"
}

warning() {
    echo -e "${YELLOW}[WARNING] $1${NC}"
}

error() {
    echo -e "${RED}[ERROR] $1${NC}"
    exit 1
}

# Verificar se está rodando como root
if [[ $EUID -eq 0 ]]; then
   error "Este script não deve ser executado como root!"
fi

# Verificar sistema operacional
if [[ "$OSTYPE" == "darwin"* ]]; then
    PLATFORM="Mac"
    ARCH=$(uname -m)
    if [[ "$ARCH" == "arm64" ]]; then
        log "Detectado Mac M3/M2/M1 (ARM64)"
        export DOCKER_DEFAULT_PLATFORM=linux/arm64
    fi
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    PLATFORM="Linux"
    log "Detectado Linux (provavelmente Ubuntu VPS)"
else
    warning "Sistema operacional não identificado. Continuando..."
fi

# Verificar se Docker está instalado
if ! command -v docker &> /dev/null; then
    error "Docker não está instalado! Instale primeiro: https://docs.docker.com/get-docker/"
fi

# Verificar se Docker Compose está instalado
if ! command -v docker-compose &> /dev/null; then
    error "Docker Compose não está instalado! Instale primeiro."
fi

# Criar estrutura de diretórios
log "Criando estrutura de diretórios..."
mkdir -p src logs config ssl

# Copiar arquivo HTML do Email Builder para src/
if [[ ! -f "src/index.html" ]]; then
    log "Copiando aplicação Email Builder..."
    # Aqui você colocaria o HTML do web app
    cat > src/index.html << 'EOF'
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Builder - Criador de Emails HTML</title>
    <!-- Cole aqui o conteúdo completo do Web App -->
</head>
<body>
    <h1>Email Builder</h1>
    <p>Configure o arquivo src/index.html com o conteúdo do Web App</p>
</body>
</html>
EOF
    warning "Arquivo src/index.html criado com placeholder. Substitua pelo conteúdo real do Web App!"
fi

# Build da imagem Docker com suporte multi-arquitetura
log "Construindo imagem Docker..."
if [[ "$PLATFORM" == "Mac" && "$ARCH" == "arm64" ]]; then
    # Para Mac M3 - build para ARM64 e AMD64
    docker buildx create --use --name multi-arch-builder 2>/dev/null || true
    docker buildx build --platform linux/amd64,linux/arm64 -t email-builder:latest --load .
else
    # Build normal para Linux
    docker build -t email-builder:latest .
fi

# Parar containers anteriores se existirem
log "Parando containers anteriores..."
docker-compose down 2>/dev/null || true

# Subir aplicação
log "Iniciando aplicação..."
docker-compose up -d

# Aguardar inicialização
log "Aguardando inicialização..."
sleep 10

# Verificar status
if docker-compose ps | grep -q "Up"; then
    log "✅ Deploy realizado com sucesso!"
    log "🌐 Aplicação disponível em: http://localhost"
    log "📊 Status: docker-compose ps"
    log "📜 Logs: docker-compose logs -f email-builder"
    
    # Mostrar informações úteis
    echo ""
    echo -e "${BLUE}=== INFORMAÇÕES DO DEPLOY ===${NC}"
    echo "Container: $(docker-compose ps --services)"
    echo "Portas: $(docker-compose port email-builder 80 2>/dev/null || echo 'Verificar manualmente')"
    echo "Logs: docker-compose logs -f email-builder"
    echo "Parar: docker-compose down"
    echo ""
    
    # Teste de conectividade
    if curl -f http://localhost/ &>/dev/null; then
        log "✅ Teste de conectividade: OK"
    else
        warning "❌ Teste de conectividade: FALHOU"
        echo "Verifique se não há conflito de porta ou firewall"
    fi
    
else
    error "❌ Deploy falhou! Verifique os logs: docker-compose logs"
fi

log "🎉 Deploy concluído!"