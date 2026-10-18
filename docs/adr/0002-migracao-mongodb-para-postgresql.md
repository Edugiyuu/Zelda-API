# ADR 0002 — Migrar o backend de MongoDB para PostgreSQL

- **Status:** Aceito — implementado; questões em aberto resolvidas no [ADR 0003](0003-bosses-importacao-e-rotas-rest.md)
- **Data:** 2026-10-12
- **Escopo:** `Zelda api plus/` (API Node + Express)

## Contexto

Hoje a API usa **MongoDB Atlas via Mongoose**, com três coleções (`Game`, `Character` e `Race`) populadas por scripts de seed. Ao revisar o código, encontramos:

- **Os dados são relacionais por natureza.** Um personagem pertence a uma raça (`Character.race` é texto livre), uma raça tem membros (`Race.members` é uma string) e personagens aparecem em jogos. Hoje esses vínculos não são garantidos e o front cruza tudo por nome.
- **Os schemas são fixos e pequenos**, então a flexibilidade de documentos do Mongo não traz ganho.
- **Há inconsistências que um schema tipado teria evitado:**
  - `Character.Age` (com "A" maiúsculo) no model, enquanto o front espera `age`;
  - `Game.id` e `Character.id` duplicam o `_id` como strings;
  - a rota `GET /race/:name` chama `getCharacter` em vez de buscar uma raça;
  - `GET /new/game` cria registros, mas deveria ser `POST`;
  - em `postGame`, a mensagem de "jogo já existe" é a mesma de "nome vazio".
- **A string de conexão está fixa no código** (`cluster0.4mdpo.mongodb.net`) e é repetida em cada seed. Só usuário e senha vêm do `.env`.

## Decisão

Migrar a persistência para **PostgreSQL**, mantendo Node + Express, com **Prisma** (ORM) para schema, migrations e consultas.

### Fonte de verdade

- O **nosso banco passa a ser a fonte de verdade**. Todos os jogos e bosses do `zelda.fanapis.com` são importados **uma única vez**, sem sincronização posterior.
- Os 8 registros que o fanapis lista como bosses, mas não são (`NOT_BOSSES` em `web/src/api.ts`), ficam de fora da importação.
- O front deixa de consultar o fanapis e de mesclar fontes por nome.

### Modelo de dados

Definido em `Zelda api plus/prisma/schema.prisma` (migration `20261013053659_init`):

| Tabela        | Chave                                 | Relações |
|---------------|---------------------------------------|----------|
| `races`       | `id` (serial)                         | 1:N com `characters` |
| `characters`  | `id` (serial)                         | `race_id` → `races` (opcional) |
| `games`       | `id` (serial)                         | N:N com `characters` |
| `appearances` | PK composta `(character_id, game_id)` | tabela de junção personagem ↔ jogo |

- As URLs usam o **ID gerado pelo nosso banco** (`/games/:id`, `/characters/:id`), não o ID do fanapis nem o nome.
- `members` deixa de existir em `races`: os membros são os personagens com aquele `race_id`.
- Campos em snake_case, iguais às colunas e ao JSON consumido pelo front.

### Infraestrutura

- Desenvolvimento: PostgreSQL 18 instalado localmente (sem Docker), conexão via `DATABASE_URL` no `.env`.
- Produção: Render (plano e versão do Postgres a confirmar no deploy).
- Corrigir junto: `GET /race/:name` → buscar raça; `/new/game` → `POST`; mensagens de erro de `postGame`.

## Consequências

- **Positivas:** integridade referencial (raça ↔ personagem ↔ jogo); schema tipado; consultas com `JOIN` em vez de cruzar por nome no front; sem dependência do fanapis em tempo real.
- **Negativas / custos:** reescrever controllers e seeds; escrever o script de importação; mudar as URLs do front de nome/ID do fanapis para o nosso ID.
- **Riscos:** novidades do fanapis não chegam sozinhas (decisão consciente); quebrar telas do front durante a troca — mitigar testando cada endpoint de `web/src/api.ts`.

## Questões em aberto

- Modelagem dos bosses e da ligação boss ↔ jogo; como traduzir os IDs do fanapis (`appearances`) para os nossos na importação.
- O que fazer com jogos que estão no seed atual e no fanapis com nomes diferentes.
- Plano do Postgres no Render (o gratuito pode expirar).

## Alternativas consideradas

- **Manter o MongoDB e só corrigir os bugs:** menor esforço, mas não resolve a falta de relacionamentos nem a validação de schema.
- **SQLite:** simples para o desenvolvimento local, mas limitado para hospedagem e concorrência. PostgreSQL atende os dois cenários.
