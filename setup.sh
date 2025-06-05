#!/bin/bash

# 🚀 Setup Automatizado - Email Builder
# Mac M3 + VPS Ubuntu | Deploy Completo

set -e

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Banner de inicio
echo -e "${CYAN}"
echo "╔══════════════════════════════════════════════════════════════════╗"
echo "║                     📧 EMAIL BUILDER SETUP 🚀                   ║"
echo "║               Setup Automatizado Completo - V1.0                ║"
echo "║           Mac M3 + VPS Ubuntu | Docker Multi-Arch               ║"
echo "╚══════════════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Funções de log
log() {
    echo -e "${GREEN}[$(date +'%H:%M:%S')] ✅ $1${NC}"
}

info() {
    echo -e "${BLUE}[$(date +'%H:%M:%S')] ℹ️  $1${NC}"
}

warning() {
    echo -e "${YELLOW}[$(date +'%H:%M:%S')] ⚠️  $1${NC}"
}

error() {
    echo -e "${RED}[$(date +'%H:%M:%S')] ❌ $1${NC}"
    exit 1
}

success() {
    echo -e "${PURPLE}[$(date +'%H:%M:%S')] 🎉 $1${NC}"
}

# Detectar sistema operacional e arquitetura
detect_system() {
    info "Detectando sistema operacional..."
    
    if [[ "$OSTYPE" == "darwin"* ]]; then
        PLATFORM="Mac"
        ARCH=$(uname -m)
        if [[ "$ARCH" == "arm64" ]]; then
            info "Detectado: Mac M3/M2/M1 (ARM64)"
            export DOCKER_DEFAULT_PLATFORM=linux/arm64
        else
            info "Detectado: Mac Intel (x86_64)"
        fi
    elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
        PLATFORM="Linux"
        info "Detectado: Linux (VPS Ubuntu)"
    else
        warning "Sistema operacional não identificado. Continuando..."
        PLATFORM="Unknown"
    fi
}

# Verificar dependências
check_dependencies() {
    info "Verificando dependências..."
    
    # Verificar se está rodando como root
    if [[ $EUID -eq 0 ]]; then
        error "Este script não deve ser executado como root!"
    fi
    
    # Verificar Docker
    if ! command -v docker &> /dev/null; then
        error "Docker não encontrado! Instale primeiro: https://docs.docker.com/get-docker/"
    fi
    
    # Verificar Docker Compose
    if ! command -v docker-compose &> /dev/null; then
        if ! docker compose version &> /dev/null; then
            error "Docker Compose não encontrado!"
        else
            info "Usando Docker Compose V2 (plugin)"
            DOCKER_COMPOSE="docker compose"
        fi
    else
        info "Usando Docker Compose V1"
        DOCKER_COMPOSE="docker-compose"
    fi
    
    log "Todas as dependências encontradas!"
}

# Criar estrutura de diretórios
create_structure() {
    info "Criando estrutura de diretórios..."
    
    mkdir -p src logs config ssl
    log "Estrutura criada: src/ logs/ config/ ssl/"
}

# Criar Dockerfile
create_dockerfile() {
    info "Criando Dockerfile..."
    
    cat > Dockerfile << 'EOF'
# Multi-stage build para otimização
FROM --platform=$BUILDPLATFORM node:18-alpine AS builder

# Instalar dependências de build
RUN apk add --no-cache git

# Criar diretório de trabalho
WORKDIR /app

# Copiar arquivos de configuração
COPY package*.json ./

# Instalar dependências
RUN npm ci --only=production

# Estágio final - Nginx para servir arquivos estáticos
FROM --platform=$TARGETPLATFORM nginx:alpine

# Instalar curl para health checks
RUN apk add --no-cache curl

# Remover configuração padrão do nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copiar configuração personalizada do nginx
COPY nginx.conf /etc/nginx/conf.d/

# Copiar arquivos da aplicação
COPY src/ /usr/share/nginx/html/

# Copiar dependências do estágio anterior (se necessário)
COPY --from=builder /app/node_modules /usr/share/nginx/html/node_modules

# Criar usuário não-root para segurança
RUN addgroup -g 1001 -S nginx-user && \
    adduser -S nginx-user -G nginx-user && \
    chown -R nginx-user:nginx-user /usr/share/nginx/html && \
    chown -R nginx-user:nginx-user /var/cache/nginx && \
    chown -R nginx-user:nginx-user /var/log/nginx && \
    chown -R nginx-user:nginx-user /etc/nginx/conf.d

# Expor porta
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/ || exit 1

# Rodar como usuário não-root
USER nginx-user

# Comando para iniciar nginx
CMD ["nginx", "-g", "daemon off;"]
EOF
    
    log "Dockerfile criado!"
}

# Criar docker-compose.yml
create_docker_compose() {
    info "Criando docker-compose.yml..."
    
    cat > docker-compose.yml << 'EOF'
version: '3.8'

services:
  email-builder:
    build:
      context: .
      dockerfile: Dockerfile
      platforms:
        - linux/amd64
        - linux/arm64
    image: email-builder:latest
    container_name: email-builder-app
    restart: unless-stopped
    ports:
      - "80:80"  # Mude para "8080:80" se já tiver algo na porta 80
    environment:
      - NODE_ENV=production
    volumes:
      # Volume para logs persistentes
      - ./logs:/var/log/nginx
      # Volume para backup de configurações (opcional)
      - ./config:/etc/nginx/conf.d:ro
    networks:
      - email-builder-network
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost/"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
    labels:
      - "traefik.enable=true"
      - "traefik.http.routers.email-builder.rule=Host(\`seu-dominio.com\`)"
      - "traefik.http.services.email-builder.loadbalancer.server.port=80"

networks:
  email-builder-network:
    driver: bridge
    ipam:
      config:
        - subnet: 172.20.0.0/16

volumes:
  logs:
    driver: local
EOF
    
    log "docker-compose.yml criado!"
}

# Criar nginx.conf
create_nginx_config() {
    info "Criando configuração do Nginx..."
    
    cat > nginx.conf << 'EOF'
server {
    listen 80;
    server_name localhost;
    
    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    
    # Root directory
    root /usr/share/nginx/html;
    index index.html index.htm;
    
    # Configuração para SPA (Single Page Application)
    location / {
        try_files $uri $uri/ /index.html;
        
        # Cache para arquivos estáticos
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
    
    # Configuração para arquivos HTML
    location ~* \.html$ {
        add_header Cache-Control "no-cache, no-store, must-revalidate";
        add_header Pragma "no-cache";
        add_header Expires "0";
    }
    
    # Health check endpoint
    location /health {
        access_log off;
        return 200 "healthy\n";
        add_header Content-Type text/plain;
    }
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/json
        application/javascript
        application/xml+rss
        application/atom+xml
        image/svg+xml;
        
    # Log configuration
    access_log /var/log/nginx/access.log;
    error_log /var/log/nginx/error.log;
}
EOF
    
    log "nginx.conf criado!"
}

# Criar package.json
create_package_json() {
    info "Criando package.json..."
    
    cat > package.json << 'EOF'
{
  "name": "email-builder",
  "version": "1.0.0",
  "description": "Web App para criação de emails HTML profissionais",
  "main": "index.html",
  "scripts": {
    "start": "serve -s src -l 3000",
    "build": "echo 'Build completed - static files ready'",
    "dev": "serve -s src -l 3000",
    "docker:build": "docker build -t email-builder .",
    "docker:run": "docker run -p 8080:80 email-builder",
    "docker:compose": "docker-compose up -d",
    "docker:down": "docker-compose down",
    "docker:logs": "docker-compose logs -f email-builder"
  },
  "keywords": [
    "email",
    "html",
    "builder",
    "newsletter",
    "template"
  ],
  "author": "ASOF",
  "license": "MIT",
  "devDependencies": {
    "serve": "^14.2.0"
  },
  "engines": {
    "node": ">=16.0.0"
  }
}
EOF
    
    log "package.json criado!"
}

# Criar deploy.sh
create_deploy_script() {
    info "Criando script de deploy..."
    
    cat > deploy.sh << 'EOF'
#!/bin/bash

# 🚀 Script de Deploy - Email Builder
set -e

log() {
    echo -e "\033[0;32m[$(date +'%H:%M:%S')] ✅ $1\033[0m"
}

error() {
    echo -e "\033[0;31m[$(date +'%H:%M:%S')] ❌ $1\033[0m"
    exit 1
}

log "Iniciando deploy..."

# Detectar Docker Compose
if command -v docker-compose &> /dev/null; then
    DOCKER_COMPOSE="docker-compose"
elif docker compose version &> /dev/null; then
    DOCKER_COMPOSE="docker compose"
else
    error "Docker Compose não encontrado!"
fi

# Build da imagem
log "Construindo imagem Docker..."
if [[ "$(uname -m)" == "arm64" && "$(uname)" == "Darwin" ]]; then
    docker buildx create --use --name multi-arch-builder 2>/dev/null || true
    docker buildx build --platform linux/amd64,linux/arm64 -t email-builder:latest --load .
else
    docker build -t email-builder:latest .
fi

# Parar containers anteriores
log "Parando containers anteriores..."
$DOCKER_COMPOSE down 2>/dev/null || true

# Subir aplicação
log "Iniciando aplicação..."
$DOCKER_COMPOSE up -d

# Aguardar inicialização
log "Aguardando inicialização..."
sleep 10

# Verificar status
if $DOCKER_COMPOSE ps | grep -q "Up"; then
    log "✅ Deploy realizado com sucesso!"
    echo "🌐 Aplicação disponível em: http://localhost"
    echo "📊 Status: $DOCKER_COMPOSE ps"
    echo "📜 Logs: $DOCKER_COMPOSE logs -f email-builder"
else
    error "Deploy falhou! Verifique: $DOCKER_COMPOSE logs"
fi
EOF
    
    chmod +x deploy.sh
    log "deploy.sh criado e executável!"
}

# Criar Web App completo
create_webapp() {
    info "Criando Web App Email Builder..."
    
    cat > src/index.html << 'WEBAPP_EOF'
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Builder - Criador de Emails HTML</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :root {
            --primary: #2563eb;
            --primary-dark: #1d4ed8;
            --secondary: #64748b;
            --success: #10b981;
            --warning: #f59e0b;
            --danger: #ef4444;
            --background: #f8fafc;
            --surface: #ffffff;
            --border: #e2e8f0;
            --text: #1e293b;
            --text-light: #64748b;
        }

        body {
            font-family: 'Inter', sans-serif;
            background: var(--background);
            color: var(--text);
            line-height: 1.6;
        }

        .app-container {
            display: flex;
            height: 100vh;
            overflow: hidden;
        }

        .sidebar {
            width: 300px;
            background: var(--surface);
            border-right: 1px solid var(--border);
            display: flex;
            flex-direction: column;
        }

        .sidebar-header {
            padding: 20px;
            border-bottom: 1px solid var(--border);
            background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
            color: white;
        }

        .sidebar-header h1 {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 5px;
        }

        .sidebar-content {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
        }

        .form-group {
            margin-bottom: 20px;
        }

        .form-group label {
            display: block;
            margin-bottom: 8px;
            font-weight: 500;
            color: var(--text);
        }

        .form-group input,
        .form-group textarea,
        .form-group select {
            width: 100%;
            padding: 10px 12px;
            border: 1px solid var(--border);
            border-radius: 8px;
            font-size: 14px;
            transition: border-color 0.2s;
        }

        .btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 10px 16px;
            border: none;
            border-radius: 8px;
            font-size: 14px;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
            text-decoration: none;
            width: 100%;
            justify-content: center;
            margin-bottom: 10px;
        }

        .btn-primary {
            background: var(--primary);
            color: white;
        }

        .btn-success {
            background: var(--success);
            color: white;
        }

        .main-content {
            flex: 1;
            display: flex;
            flex-direction: column;
        }

        .toolbar {
            background: var(--surface);
            border-bottom: 1px solid var(--border);
            padding: 15px 20px;
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .preview-container {
            flex: 1;
            display: flex;
            overflow: hidden;
        }

        .code-editor,
        .preview-panel {
            flex: 1;
            display: flex;
            flex-direction: column;
        }

        .panel-header {
            background: var(--surface);
            border-bottom: 1px solid var(--border);
            padding: 12px 20px;
            font-weight: 500;
            color: var(--text);
        }

        .code-textarea {
            flex: 1;
            border: none;
            resize: none;
            padding: 20px;
            font-family: 'Courier New', monospace;
            font-size: 13px;
            line-height: 1.5;
            background: #1e293b;
            color: #e2e8f0;
        }

        .preview-iframe {
            flex: 1;
            border: none;
            background: white;
        }

        .template-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 10px;
        }

        .template-item {
            padding: 12px;
            border: 1px solid var(--border);
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s;
            background: var(--surface);
        }

        .template-item:hover {
            border-color: var(--primary);
        }

        .template-item.active {
            border-color: var(--primary);
            background: rgba(37, 99, 235, 0.05);
        }

        .status-message {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 16px;
            border-radius: 8px;
            font-weight: 500;
            z-index: 1000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        }

        .status-message.show {
            transform: translateX(0);
        }

        .status-message.success {
            background: var(--success);
            color: white;
        }
    </style>
</head>
<body>
    <div class="app-container">
        <div class="sidebar">
            <div class="sidebar-header">
                <h1><i class="fas fa-envelope"></i> Email Builder</h1>
                <p>Criador de emails HTML profissionais</p>
            </div>
            <div class="sidebar-content">
                <div class="form-group">
                    <label>📋 Templates</label>
                    <div class="template-grid">
                        <div class="template-item active" onclick="loadTemplate('asof')">
                            <div><strong>ASOF Newsletter</strong></div>
                            <div style="font-size: 12px; color: #666;">Template institucional</div>
                        </div>
                        <div class="template-item" onclick="loadTemplate('simple')">
                            <div><strong>Email Simples</strong></div>
                            <div style="font-size: 12px; color: #666;">Design minimalista</div>
                        </div>
                    </div>
                </div>

                <div class="form-group">
                    <button class="btn btn-success" onclick="copyToClipboard()">
                        <i class="fas fa-copy"></i> Copiar para Gmail
                    </button>
                    <button class="btn btn-primary" onclick="downloadHTML()">
                        <i class="fas fa-download"></i> Baixar HTML
                    </button>
                    <button class="btn btn-primary" onclick="downloadPDF()">
                        <i class="fas fa-file-pdf"></i> Baixar PDF
                    </button>
                </div>
            </div>
        </div>

        <div class="main-content">
            <div class="toolbar">
                <span>Email Builder v1.0</span>
                <div style="margin-left: auto;">
                    <button class="btn btn-primary" onclick="updatePreview()">
                        <i class="fas fa-sync"></i> Atualizar
                    </button>
                </div>
            </div>

            <div class="preview-container">
                <div class="code-editor">
                    <div class="panel-header">
                        <i class="fas fa-code"></i> Editor HTML/CSS
                    </div>
                    <textarea id="codeEditor" class="code-textarea"></textarea>
                </div>

                <div style="width: 1px; background: var(--border);"></div>

                <div class="preview-panel">
                    <div class="panel-header">
                        <i class="fas fa-eye"></i> Preview
                    </div>
                    <iframe id="previewFrame" class="preview-iframe"></iframe>
                </div>
            </div>
        </div>
    </div>

    <div id="statusMessage" class="status-message"></div>

    <script>
        const templates = {
            asof: \`<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: 'Segoe UI', sans-serif; margin: 0; padding: 20px; background: #f4f4f4; }
        .container { max-width: 650px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 10px 30px rgba(4, 84, 149, 0.1); }
        .header { background: linear-gradient(135deg, #045495 0%, #76AEEA 100%); color: white; padding: 30px; text-align: center; }
        .content { padding: 40px; }
        .footer { background: #045495; color: white; padding: 25px; text-align: center; font-size: 0.9em; }
        .highlight { background: #BAD7F7; border-left: 4px solid #045495; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>ASOF</h1>
            <p>Associação Nacional dos Oficiais de Chancelaria</p>
        </div>
        <div class="content">
            <h2 style="color: #045495;">Comunicado Importante</h2>
            <p>Prezados(as) Associados(as),</p>
            <p>Este é um template institucional da ASOF. Personalize conforme necessário.</p>
            <div class="highlight">
                <strong>📢 Destaque:</strong> Informações importantes aqui.
            </div>
            <p>Atenciosamente,<br>Diretoria ASOF</p>
        </div>
        <div class="footer">
            <p><strong>ASOF</strong> - Brasília/DF | contato@asof.org.br</p>
        </div>
    </div>
</body>
</html>\`,
            simple: \`<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; }
        .container { background: white; padding: 30px; border-radius: 8px; }
        .header { border-bottom: 2px solid #eee; padding-bottom: 20px; margin-bottom: 20px; }
        .btn { background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; margin: 20px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Título do Email</h1>
        </div>
        <p>Olá,</p>
        <p>Conteúdo do seu email aqui...</p>
        <a href="#" class="btn">Botão de Ação</a>
        <p>Atenciosamente,<br>Equipe</p>
    </div>
</body>
</html>\`
        };

        let currentTemplate = 'asof';

        document.addEventListener('DOMContentLoaded', function() {
            loadTemplate('asof');
            document.getElementById('codeEditor').addEventListener('input', () => updatePreview());
        });

        function loadTemplate(templateName) {
            currentTemplate = templateName;
            document.getElementById('codeEditor').value = templates[templateName];
            
            document.querySelectorAll('.template-item').forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('onclick').includes(templateName)) {
                    item.classList.add('active');
                }
            });
            
            updatePreview();
        }

        function updatePreview() {
            const code = document.getElementById('codeEditor').value;
            const iframe = document.getElementById('previewFrame');
            iframe.srcdoc = code;
        }

        function copyToClipboard() {
            try {
                const htmlContent = document.getElementById('codeEditor').value;
                const printWindow = window.open('', '_blank', 'width=800,height=600');
                printWindow.document.write(htmlContent);
                printWindow.document.close();
                
                setTimeout(() => {
                    printWindow.focus();
                    printWindow.document.execCommand('selectAll', false, null);
                    const success = printWindow.document.execCommand('copy');
                    
                    if (success) {
                        showStatus('Copiado! Cole no Gmail com Ctrl+V', 'success');
                    }
                    
                    setTimeout(() => printWindow.close(), 500);
                }, 1000);
                
            } catch (error) {
                showStatus('Erro ao copiar', 'error');
            }
        }

        function downloadHTML() {
            const code = document.getElementById('codeEditor').value;
            const blob = new Blob([code], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'email.html';
            a.click();
            URL.revokeObjectURL(url);
            showStatus('HTML baixado!', 'success');
        }

        function downloadPDF() {
            try {
                const htmlContent = document.getElementById('codeEditor').value;
                const printWindow = window.open('', '_blank');
                printWindow.document.write(htmlContent);
                printWindow.document.close();
                
                setTimeout(() => {
                    printWindow.focus();
                    printWindow.print();
                    setTimeout(() => printWindow.close(), 1000);
                }, 500);
                
                showStatus('Escolha "Salvar como PDF"', 'success');
            } catch (error) {
                showStatus('Erro ao gerar PDF', 'error');
            }
        }

        function showStatus(message, type = 'success') {
            const statusEl = document.getElementById('statusMessage');
            statusEl.textContent = message;
            statusEl.className = \`status-message \${type}\`;
            statusEl.classList.add('show');
            setTimeout(() => statusEl.classList.remove('show'), 3000);
        }
    </script>
</body>
</html>
WEBAPP_EOF
    
    log "Web App Email Builder criado em src/index.html!"
}

# Criar README.md
create_readme() {
    info "Criando documentação..."
    
    cat > README.md << 'EOF'
# 📧 Email Builder - Web App

Criador profissional de emails HTML com funcionalidades de copiar para Gmail e exportar PDF.

## 🚀 Deploy Rápido

```bash
# Download e execução automática
curl -fsSL https://raw.githubusercontent.com/seu-repo/email-builder/main/setup.sh | bash

# Ou manualmente:
./setup.sh
```

## 🌐 Acesso

- **Local:** http://localhost
- **VPS:** http://seu-ip-vps

## 🛠️ Comandos Úteis

```bash
# Ver logs
docker-compose logs -f email-builder

# Parar aplicação
docker-compose down

# Reiniciar
docker-compose restart
```

## ✨ Funcionalidades

- ✅ Editor HTML/CSS em tempo real
- ✅ Preview ao vivo
- ✅ Templates prontos (ASOF, Simples)
- ✅ Copiar para Gmail (preserva formatação)
- ✅ Download HTML e PDF
- ✅ Interface responsiva

---
**Criado pela ASOF** | v1.0.0
EOF
    
    log "README.md criado!"
}

# Deploy automático
deploy_application() {
    info "Executando deploy..."
    
    if ./deploy.sh; then
        success "Deploy realizado com sucesso!"
        return 0
    else
        error "Deploy falhou!"
        return 1
    fi
}

# Verificar conectividade
test_connectivity() {
    info "Testando conectividade..."
    
    sleep 5
    
    if curl -f http://localhost/ &>/dev/null; then
        success "✅ Aplicação funcionando: http://localhost"
    else
        warning "❌ Teste de conectividade falhou"
        info "Verifique se não há conflito de porta ou firewall"
    fi
}

# Mostrar informações finais
show_final_info() {
    echo ""
    echo -e "${CYAN}╔══════════════════════════════════════════════════════════════════╗${NC}"
    echo -e "${CYAN}║                    🎉 SETUP CONCLUÍDO COM SUCESSO! 🎉           ║${NC}"
    echo -e "${CYAN}╚══════════════════════════════════════════════════════════════════╝${NC}"
    echo ""
    echo -e "${GREEN}📋 INFORMAÇÕES DO DEPLOY:${NC}"
    echo -e "${BLUE}🌐 URL:${NC} http://localhost"
    echo -e "${BLUE}📊 Status:${NC} docker-compose ps"
    echo -e "${BLUE}📜 Logs:${NC} docker-compose logs -f email-builder"
    echo -e "${BLUE}⏹️  Parar:${NC} docker-compose down"
    echo -e "${BLUE}🔄 Reiniciar:${NC} docker-compose restart"
    echo ""
    echo -e "${GREEN}✨ FUNCIONALIDADES DISPONÍVEIS:${NC}"
    echo "• Editor HTML/CSS em tempo real"
    echo "• Preview ao vivo do email"
    echo "• Templates prontos (ASOF Newsletter, Email Simples)"
    echo "• Copiar para Gmail (preserva formatação)"
    echo "• Download HTML e PDF"
    echo "• Interface responsiva"
    echo ""
    echo -e "${YELLOW}📁 ARQUIVOS CRIADOS:${NC}"
    echo "• Dockerfile (imagem multi-arquitetura)"
    echo "• docker-compose.yml (orquestração)"
    echo "• nginx.conf (servidor web)"
    echo "• package.json (dependências)"
    echo "• deploy.sh (script de deploy)"
    echo "• src/index.html (Web App completo)"
    echo "• README.md (documentação)"
    echo ""
    echo -e "${PURPLE}🚀 Para acessar: Abra http://localhost no seu navegador${NC}"
    echo ""
}

# Função principal
main() {
    echo ""
    info "Iniciando setup automatizado do Email Builder..."
    echo ""
    
    detect_system
    check_dependencies
    create_structure
    create_dockerfile
    create_docker_compose
    create_nginx_config
    create_package_json
    create_deploy_script
    create_webapp
    create_readme
    
    echo ""
    warning "🚀 Pronto para deploy! Executando agora..."
    echo ""
    
    if deploy_application; then
        test_connectivity
        show_final_info
    else
        error "Setup falhou durante o deploy!"
    fi
}

# Executar função principal
main "$@"