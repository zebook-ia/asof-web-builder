# Email Builder

Aplicativo para criacao de emails HTML. Esta versao do repositorio contem dois modos de uso independentes:

- **Versao Local** (`local/`): executada offline com Node.js
- **Versao Web-Based** (raiz do projeto): utiliza Docker para disponibilizar o app

## Requisitos

- Node.js 16+
- npm
- Docker e Docker Compose (somente para a versao web)

## Como Usar

### Versao Local

```bash
cd local
chmod +x start.sh
./start.sh
```

O aplicativo sera acessivel em `http://localhost:3000`.

### Versao Web-Based

```bash
chmod +x quick_setup.sh
./quick_setup.sh
```

O container Docker sobe em `http://localhost`.

## Estrutura

```
local/            # Versao offline
web (raiz)/       # Arquivos Docker e scripts
.github/workflows # Pipeline CI
```

## CI/CD

Este repositorio inclui um workflow do GitHub Actions (`.github/workflows/ci.yml`) que instala dependencias e executa o build a cada push ou pull request. Caso prefira configurar manualmente:

1. Instale Node.js e Docker na maquina de CI
2. Execute `npm install`
3. Rode `npm run build` ou os scripts de deploy conforme necessidade

## Licenca

MIT
