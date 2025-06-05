# Analise do Repositorio

O projeto **Email Builder** e um aplicativo para gerar emails HTML. Ele utiliza
Node.js apenas como servidor de arquivos estaticos e opcionalmente Docker para
deploy em producao.

## Principais Caracteristicas
- Editor HTML completo (`index.html`)
- Scripts de deploy e setup em shell
- Arquivos de configuracao Docker (`dockerfile-email-builder.yaml`,
  `docker-compose-email-builder.yml`)

## Dependencias
- Node.js 16 ou superior
- npm
- Docker e Docker Compose (somente para a versao web)
- Dev dependency: `serve`
