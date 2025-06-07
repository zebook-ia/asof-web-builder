# 🚀 Email Builder - Deploy com Docker

Web App profissional para criação de emails HTML com funcionalidade de copiar para Gmail e exportar PDF.

> **Dependências**
> Este projeto exige [Docker](https://docs.docker.com/get-docker/) e
> [Docker Compose](https://docs.docker.com/compose/) para a construção e
> execução dos containers. Certifique-se de que ambos estejam instalados antes
> de prosseguir.

## 📋 Pré-requisitos

### Mac M3 (Desenvolvimento)
```bash
# Instalar Docker Desktop
brew install --cask docker

# Verificar instalação
docker --version
docker-compose --version
```

### Ubuntu VPS (Produção)
```bash
# Atualizar sistema
sudo apt update && sudo apt upgrade -y

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER

# Instalar Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Reiniciar sessão para aplicar grupos
newgrp docker
```

## 🛠️ Estrutura do Projeto

```
email-builder/
├── Dockerfile              # Imagem Docker multi-arquitetura
├── docker-compose.yml      # Orquestração de containers
├── nginx.conf              # Configuração do servidor web
├── package.json             # Dependências e scripts
├── deploy.sh               # Script automatizado de deploy
├── setup.sh                # Gera arquivos padrão e executa o deploy
├── src/
│   └── index.html          # Web App Email Builder
├── logs/                   # Logs do Nginx
├── config/                 # Configurações personalizadas
└── ssl/                    # Certificados SSL (opcional)
```

### Sobre os scripts

- **deploy.sh**: compila a imagem Docker e sobe os containers via Docker
  Compose. Ideal para atualizar rapidamente o ambiente já configurado.
- **setup.sh**: cria todos os arquivos básicos do projeto e, ao final, chama o
  `deploy.sh`. Útil para preparar uma máquina do zero.

## 🚀 Deploy Rápido

### 1. Preparar Ambiente
```bash
# Clonar/criar estrutura
mkdir email-builder && cd email-builder

# Copiar todos os arquivos Docker (Dockerfile, docker-compose.yml, etc.)
# Copiar o Web App para src/index.html
```

### 2. Configurar Aplicação
```bash
# Criar diretório src
mkdir -p src

# Copiar o HTML do Web App Email Builder para src/index.html
# (Use o conteúdo completo do artefato Web App criado anteriormente)
```

### 3. Deploy Automatizado
```bash
# Dar permissão ao script
chmod +x deploy.sh

# Executar deploy
./deploy.sh
```

### 4. Deploy Manual (alternativa)
```bash
# Build da imagem
docker build -t email-builder:latest .

# Subir aplicação
docker-compose up -d

# Verificar status
docker-compose ps
```

## ▶️ Executar após ajustes

Após editar `src/index.html` ou outros arquivos da aplicação, reinicie os
containers para visualizar as mudanças:

```bash
docker-compose up -d --build
```
O acesso padrão continua em [http://localhost](http://localhost).

## 🌐 Acesso à Aplicação

- **Local:** http://localhost
- **VPS:** http://seu-ip-vps
- **Com domínio:** http://seu-dominio.com

## 🔧 Comandos Úteis

### Gerenciamento de Containers
```bash
# Ver status
docker-compose ps

# Ver logs
docker-compose logs -f email-builder

# Parar aplicação
docker-compose down

# Reiniciar
docker-compose restart

# Atualizar aplicação
docker-compose down
docker-compose up -d --build
```

### Monitoramento
```bash
# Uso de recursos
docker stats

# Logs em tempo real
docker-compose logs -f

# Health check
curl -f http://localhost/health
```

## 🔐 Configuração SSL (Opcional)

### 1. Obter Certificado SSL
```bash
# Usando Certbot (Let's Encrypt)
sudo apt install certbot
sudo certbot certonly --standalone -d seu-dominio.com

# Copiar certificados
sudo cp /etc/letsencrypt/live/seu-dominio.com/fullchain.pem ./ssl/
sudo cp /etc/letsencrypt/live/seu-dominio.com/privkey.pem ./ssl/
sudo chown $USER:$USER ./ssl/*
```

### 2. Ativar SSL
```bash
# Criar configuração SSL
cat > proxy.conf << EOF
server {
    listen 443 ssl;
    server_name seu-dominio.com;
    
    ssl_certificate /etc/nginx/ssl/fullchain.pem;
    ssl_certificate_key /etc/nginx/ssl/privkey.pem;
    
    location / {
        proxy_pass http://email-builder:80;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
    }
}
EOF

# Subir com SSL
docker-compose --profile ssl up -d
```

## 🐛 Troubleshooting

### Problemas Comuns

**Porta já em uso:**
```bash
# Mudar porta no docker-compose.yml
ports:
  - "8080:80"  # ao invés de "80:80"
```

**Problema de permissão:**
```bash
# Adicionar usuário ao grupo docker
sudo usermod -aG docker $USER
newgrp docker
```

**Container não inicia:**
```bash
# Ver logs detalhados
docker-compose logs email-builder

# Verificar configuração
docker-compose config
```

**Conflito de arquitetura Mac M3 → Ubuntu:**
```bash
# Forçar build para AMD64
docker buildx build --platform linux/amd64 -t email-builder:latest .
```

## 📈 Monitoramento e Backup

### Backup de Dados
```bash
# Backup de configurações
tar -czf email-builder-backup-$(date +%Y%m%d).tar.gz config/ logs/ ssl/

# Restaurar backup
tar -xzf email-builder-backup-YYYYMMDD.tar.gz
```

### Monitoramento com Watchtower (Opcional)
```bash
# Adicionar ao docker-compose.yml
watchtower:
  image: containrrr/watchtower
  volumes:
    - /var/run/docker.sock:/var/run/docker.sock
```

## 🆘 Suporte

### Logs Importantes
- **Aplicação:** `docker-compose logs email-builder`
- **Nginx:** `./logs/access.log` e `./logs/error.log`
- **Sistema:** `sudo journalctl -u docker`

### Comandos de Diagnóstico
```bash
# Verificar Docker
docker version
docker-compose version

# Verificar rede
docker network ls

# Verificar recursos
docker system df
```

## 🎯 Próximos Passos

1. **Configurar domínio** próprio
2. **Implementar SSL** com Let's Encrypt
3. **Configurar backup** automatizado
4. **Monitoramento** com Prometheus/Grafana
5. **CI/CD** com GitHub Actions

---

**Criado por:** ASOF  
**Versão:** 1.0.0  
**Licença:** MIT
