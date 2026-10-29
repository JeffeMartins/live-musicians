# Contexto da modernização

Repositório: `live-musicians`. Revisão em 28/10/2026. O objetivo é tornar o clone reproduzível e o comportamento compreensível em uma entrevista técnica, preservando o contexto histórico de exercício/protótipo.

## Decisões e validação

- Frontend React/Vite funcional: lista real da API, formulário de cadastro e estados de erro/vazio/carregamento.
- API Express/Mongoose atualizada, banco local e ausência de credenciais cloud no código.
- Correção do fallback do nome GitHub (`name || login`), timeout externo e unicidade de username.
- Validação de coordenadas numéricas e limites geográficos; busca MongoDB usa longitude/latitude na ordem correta.
- Normalização/deduplicação de tecnologias sem criar variável global; testes dos casos inválidos.


Consulte os scripts reais em `package.json` (ou nos módulos do monorepo). Build, teste unitário e teste com serviços externos são evidências diferentes. A CI não valida credenciais de terceiros nem garante comportamento em produção. O README informa dependências externas e funcionalidades ainda não implementadas.

## Segurança de configurações antigas

Configurações locais e segredos foram retirados da versão atual quando presentes. Isso não remove conteúdo de commits antigos. Se algum segredo histórico ainda estiver ativo, revogue-o no provedor e gere outro; não reutilize credenciais publicadas. A revisão preserva o histórico Git e não faz force push.
