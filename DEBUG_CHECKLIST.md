# Debug Checklist

## 1. Módulos e Componentes Críticos
- [ ] Dockerfile padronizado (renomear `dockerfile-email-builder.yaml` para `Dockerfile`)
- [ ] Compose padronizado (renomear `docker-compose-email-builder.yml` para `docker-compose.yml`)
- [x] Configuração do Nginx (`nginx.conf`)
- [ ] Scripts `deploy.sh` e `setup.sh` atualizados para nomes padrão

## 2. Critérios para Identificação de Pontos Críticos
- [ ] Corrigir referências inconsistentes a Dockerfile/Compose
- [ ] Adicionar `package-lock.json`
- [ ] Validar ambiente e dependências Docker
- [ ] Garantir porta 80 livre ou ajustar mapeamento
- [ ] Ajustar permissões de `logs/` e `config/`
- [x] Health-check em `/health` operando

## 3. Ferramentas de Debug Recomendadas
- [ ] `docker build` e `docker-compose config`
- [ ] `docker-compose logs`
- [ ] Utilizar `curl` para testes
- [ ] Inspeção com `docker exec`
- [ ] Validação de YAML com `yamllint`

## 4. Roteiro de Debug
- [ ] Verificar estrutura e nomes de arquivos
- [ ] Construir imagem com `docker build`
- [ ] Validar `docker-compose`
- [ ] Subir containers e checar status
- [ ] Testar endpoints com `curl`
- [ ] Verificar logs
- [ ] Corrigir configurações e repetir testes

## 5. Formato de Relatório Estruturado
- [ ] Registrar ambiente testado
- [ ] Documentar problemas encontrados
- [ ] Listar passos executados
- [ ] Registrar ações corretivas
- [ ] Informar resultado final

## Possíveis Melhorias
- [ ] Adicionar `package-lock.json`
- [ ] Manter consistência de nomes de arquivos
- [ ] Implementar CI/CD para validação de build

