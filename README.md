# 🚀 Email Builder - Deploy com Docker

Web App profissional para criação de emails HTML com funcionalidade de copiar para Gmail e exportar PDF.

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
├── docker-compose.yml      # Orquestração de containers (se aplicável para front-end estático)
├── nginx.conf              # Configuração do Nginx (se usado para servir)
├── package.json            # Dependências e scripts (Node.js para 'serve' e build)
├── deploy.sh               # Script automatizado de deploy (se aplicável)
├── index.html              # Ponto de entrada principal da aplicação Web
├── style.css               # Folha de estilos principal
├── script.js               # Lógica principal da aplicação em JavaScript
├── logs/                   # Logs (e.g., do Nginx, se usado)
├── config/                 # Configurações personalizadas (se houver)
└── ssl/                    # Certificados SSL (opcional, para HTTPS)
```

### Arquitetura do Frontend

O frontend do Email Builder é uma aplicação de página única (SPA) construída com HTML, CSS e JavaScript puro. A estrutura visa separar preocupações:

- **`index.html`**: Contém a estrutura esquelética da página, incluindo os containers para a sidebar, a barra de ferramentas, o editor de código e o painel de preview. Ele também linka os arquivos CSS e JavaScript externos.
- **`style.css`**: Define todos os estilos visuais da aplicação, incluindo layout, tipografia, cores e responsividade. Utiliza variáveis CSS para fácil customização de temas.
- **`script.js`**: Abriga toda a lógica da aplicação. Isso inclui:
    - **Gerenciamento de Templates**: Carregamento e manipulação dos templates de email (atualmente embutidos como strings JavaScript).
    - **Manipulação do DOM**: Interação com os elementos HTML para atualizar o editor, o preview, e responder a ações do usuário.
    - **Funcionalidades Principais**: Lógica para copiar para a área de transferência (Gmail), download de HTML, download de PDF (via janela de impressão), e atualização do preview.
    - **Controles da UI**: Handlers para botões, seletores e outras interações da interface.
    - **`EmailBuilderAPI`**: Um namespace (objeto global `window.EmailBuilderAPI`) que expõe funções chave para interagir programaticamente com o builder. Isso facilita testes, debugging e potenciais integrações futuras.

### Fluxo de Dados e Interações

1.  **Inicialização**: Ao carregar a página, `script.js` inicializa a aplicação, define os event listeners nos elementos da UI e carrega o template "Em Branco" por padrão.
2.  **Seleção de Template**: O usuário clica em um item de template na sidebar. O `script.js` detecta o clique, identifica o template selecionado através do atributo `data-template`, carrega o HTML correspondente no editor de texto e atualiza o preview.
3.  **Edição de Código**: O usuário edita o HTML/CSS diretamente na `textarea` do editor. Um listener de `input` (com debounce) detecta as alterações e atualiza o `iframe` de preview em tempo real.
4.  **Ações (Copiar, Baixar)**:
    *   **Copiar para Gmail**: O conteúdo do editor é colocado em uma nova janela temporária, selecionado e copiado para a área de transferência, tentando preservar a formatação HTML.
    *   **Baixar HTML**: O conteúdo do editor é empacotado em um Blob e um link de download é criado e clicado programaticamente.
    *   **Baixar PDF**: O conteúdo do editor é injetado em uma nova janela com estilos de impressão e a caixa de diálogo de impressão do navegador é acionada, permitindo "Salvar como PDF".
5.  **Configurações Rápidas**: Alterações em título, cor ou largura máxima são atualmente registradas no console e podem ser usadas para futuras melhorias (e.g., modificar dinamicamente o template ou o nome do arquivo baixado).

## 🚀 Deploy Rápido (Servindo Arquivos Estáticos)

Como esta é uma aplicação frontend estática, o deploy pode ser tão simples quanto servir os arquivos `index.html`, `style.css`, e `script.js` através de qualquer servidor web. O `package.json` inclui o pacote `serve` para desenvolvimento local fácil.

### 1. Preparar Ambiente
```bash
# Clonar o repositório (ou copiar os arquivos: index.html, style.css, script.js, package.json)
# mkdir email-builder && cd email-builder
# (Copie os arquivos para este diretório)
```

### 2. Instalar Dependências (para desenvolvimento/teste local com 'serve')
```bash
npm install
# ou, se preferir yarn:
# yarn install
```

### 3. Executar Localmente (usando 'serve')
```bash
npm start
# ou
# npx serve .
# (Isso servirá o diretório atual na porta 3000 por padrão)
```
Acesse em `http://localhost:3000` (ou a porta indicada pelo `serve`).

### 4. Deploy em Produção (Exemplo com Nginx)

Para produção, você pode usar um servidor web como Nginx ou Apache, ou plataformas de hospedagem estática como GitHub Pages, Netlify, Vercel, AWS S3, etc.

**Exemplo Básico com Docker e Nginx (usando o `nginx.conf` e `Dockerfile` fornecidos):**

```bash
# Certifique-se que Docker e Docker Compose estão instalados.
# Construir a imagem Docker
docker build -t email-builder-frontend:latest .

# Subir o container (se usando docker-compose.yml adaptado para servir arquivos estáticos)
# docker-compose up -d
# OU rodar diretamente com Docker:
docker run -d -p 80:80 --name email-builder-app email-builder-frontend:latest
```
Isso pressupõe que o `Dockerfile` e `nginx.conf` estão configurados para servir os arquivos `index.html`, `style.css`, e `script.js` do diretório raiz ou de um subdiretório (e.g., `dist/` ou `public/` se um passo de build fosse adicionado).

**Nota:** O `deploy.sh` e `docker-compose.yml` originais podem precisar de ajustes para refletir que agora são arquivos estáticos sendo servidos, em vez de uma aplicação `src/index.html` isolada. O `Dockerfile` também deve ser ajustado para copiar `index.html`, `style.css`, `script.js` para o local apropriado do Nginx (e.g., `/usr/share/nginx/html`).

### 3. Deploy Automatizado (Adaptar `deploy.sh`)
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