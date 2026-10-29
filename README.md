# Busca geográfica de perfis GitHub

Monorepo de um exercício de cadastro de perfis, tecnologias e localização. Apesar do nome histórico, o domínio implementado é de desenvolvedores/perfis GitHub, não de streaming ou contratação de músicos.

[![CI](https://github.com/JeffeMartins/live-musicians/actions/workflows/ci.yml/badge.svg)](https://github.com/JeffeMartins/live-musicians/actions/workflows/ci.yml)

## Melhorias de engenharia

- Frontend React/Vite funcional: lista real da API, formulário de cadastro e estados de erro/vazio/carregamento.
- API Express/Mongoose atualizada, banco local e ausência de credenciais cloud no código.
- Correção do fallback do nome GitHub (`name || login`), timeout externo e unicidade de username.
- Validação de coordenadas numéricas e limites geográficos; busca MongoDB usa longitude/latitude na ordem correta.
- Normalização/deduplicação de tecnologias sem criar variável global; testes dos casos inválidos.

## Executar localmente

Pré-requisitos: Node.js 24 LTS e npm; Docker Compose v2 para os serviços que usam banco.

```sh
docker compose up -d --build
cd web
npm ci
npm run dev
```

API em `http://localhost:3333`, frontend em `http://localhost:5173`. Configure `web/.env.local` a partir de `.env.example` apenas se mudar a URL.

Rotas: `GET /devs` (até 100 registros), `POST /devs`, `GET /search?latitude=-23.5&longitude=-46.6&techs=React,Node`. A busca usa raio de 10 km e índice geoespacial.

Cadastro: `{"github_username":"JeffeMartins","techs":"React,Node","latitude":-23.5,"longitude":-46.6}`. A consulta pública ao GitHub é uma dependência externa com rate limits próprios. Use coordenadas fictícias e não publique localização pessoal sem autorização. A API não implementa identidade de usuários ou moderação.

Verificação: em `backend`, `npm ci && npm test`; em `web`, `npm ci && npm run build`. A UI ainda não oferece um mapa ou formulário dedicado de busca por raio, mas a rota de busca existe. Os testes não chamam o GitHub real.

## Qualidade e limites da evidência

As mudanças preservam a proposta do exercício e corrigem problemas observados no código. A CI usa Node 24 e `npm ci`, executa o build quando disponível e os testes existentes. O lockfile é versionado; dependências e pastas de build não são. Dependabot acompanha atualizações semanais. Não há promessa de cobertura total, auditoria completa de segurança ou capacidade de produção.

Não publique `.env`, cookies, tokens ou dados reais de clientes. Antes de expor a aplicação à internet, revise autenticação/autorização, TLS, limites de chamadas, logs e backups conforme o domínio. Os exemplos são para execução local. Use `docker compose down` para parar os containers; volumes persistem e `down -v` apaga seus dados.
