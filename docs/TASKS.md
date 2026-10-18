# Tasks

Quadro simples de tarefas do Hyrule Compendium, no formato de task list do GitHub.

- Cada tarefa tem um ID (`T-001`, `T-002`…) que pode ser citado em commits e PRs (`feat: importa jogos (T-005)`).
- Mova a linha entre as seções conforme o andamento e marque `[x]` ao concluir.
- **Decisão** = algo a definir antes de implementar (vira ADR quando for relevante).
- Tarefas grandes viram uma lista de subtarefas, não um arquivo novo.

## Em andamento

- [ ] **T-003** Migrar o backend para PostgreSQL — [ADR 0002](adr/0002-migracao-mongodb-para-postgresql.md), [ADR 0003](adr/0003-bosses-importacao-e-rotas-rest.md)
  - [x] Instalar Prisma e criar schema (`races`, `characters`, `games`, `appearances`)
  - [x] Aplicar a migration `init` no banco local
  - [x] **T-004** *Decisão:* bosses em `bosses` + junção `boss_appearances`
  - [x] **T-005** *Decisão:* sem conflito — os jogos do seed antigo são remakes e entram como jogos próprios; `games.name` é único
  - [x] **T-006** Importação única do fanapis a partir do snapshot em `prisma/data/` (40 jogos, 42 bosses)
  - [x] **T-007** Seeds de raças e personagens em `prisma/seed.js` (`npm run db:seed`)
  - [x] **T-008** Controllers reescritos com Prisma Client
  - [x] **T-009** Rotas REST (`/games/:id`, `POST /games`, `/races/:id`, `/bosses`…) e mensagens de erro corrigidas
  - [x] **T-010** Front usa só a nossa API, com IDs nas URLs; `VITE_API_URL` configurável
  - [x] **T-011** Remover Mongoose, os models, os seeds antigos e a conexão com o MongoDB Atlas
  - [ ] **T-015** Preencher `appearances` (personagem ↔ jogo): os seeds antigos não tinham essa informação

## A fazer

### Deploy

- [ ] **T-012** Deploy da API e do Postgres no Render (Postgres 18; confirmar plano e expiração do gratuito)

## Feito

- [x] **T-001** Redesign visual: paleta mais clara, texturas por página e título dourado no Explore — [ADR 0001](adr/0001-redesign-paleta-e-texturas.md)
- [x] **T-002** Registrar as decisões em ADRs (`docs/adr/`)
- [x] **T-013** Tirar `Zelda api plus/node_modules` do versionamento
- [x] **T-014** Commitar o redesign, a migração e os ADRs em commits separados
