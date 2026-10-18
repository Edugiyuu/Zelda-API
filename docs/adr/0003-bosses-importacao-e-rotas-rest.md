# ADR 0003 — Bosses, importação do fanapis e rotas REST da API

- **Status:** Aceito
- **Data:** 2026-10-17
- **Escopo:** `Zelda api plus/` e `web/src/api.ts`
- **Complementa:** [ADR 0002](0002-migracao-mongodb-para-postgresql.md) (fecha as questões em aberto)

## Contexto

O ADR 0002 deixou em aberto como modelar os bosses, como traduzir os IDs do fanapis e o que fazer com jogos repetidos. Ao implementar a migração, também apareceram três problemas práticos:

- Os personagens citam raças que não têm ficha (`Kokiri`, `Fairy`, `Gerudo`, `Demonic`) e usam o singular (`Hylian`), enquanto as raças estão no plural (`Hylians`).
- O Prisma 7 (`prisma-client`) gera o client em **TypeScript**, e a API é JavaScript rodando no Node 22.
- As rotas antigas misturavam singular/plural, buscavam personagem por nome e criavam jogos com `GET`.

## Decisão

### Bosses (T-004)

- Tabela `bosses` (`id`, `name` único, `description`) e junção `boss_appearances` (PK `(boss_id, game_id)`), igual a `appearances` de personagens.
- `dungeons` do fanapis não é importado (vem vazio).

### Importação única do fanapis (T-006)

- O retorno do fanapis foi salvo em `prisma/data/fanapis-games.json` e `fanapis-bosses.json` (com `id` renomeado para `fanapis_id`). O seed lê esses arquivos — nada é buscado na rede.
- Na importação, cada `fanapis_id` de jogo é mapeado para o nosso `id`; as `appearances` dos bosses (URLs do fanapis) são traduzidas por esse mapa.
- Os 8 `NOT_BOSSES` ficam de fora. Resultado: 40 jogos e 42 bosses.

### Jogos com nomes diferentes (T-005)

- Não há conflito real: os 9 jogos do seed antigo são remakes/edições (`… 3D`, `… HD`, `Definitive Edition`) e entram como jogos próprios.
- `games.name` passa a ser **único**. O fanapis lista *Tri Force Heroes* duas vezes; os dois IDs apontam para o mesmo registro.

### Raças sem ficha

- Toda raça citada por um personagem vira uma linha em `races`. Se não houver ficha, a linha tem só o nome (`description` nulo) e o front mostra como "Coming soon".
- O vínculo singular → plural (`Hylian` → `Hylians`) é resolvido no seed; a API devolve sempre o nome da raça (`race: "Hylians"`) e o `race_id`.

### Rotas REST

| Método | Rota              | Retorno |
|--------|-------------------|---------|
| GET    | `/games`          | lista de jogos |
| GET    | `/games/:id`      | jogo + `characters` e `bosses` (`{ id, name }`) |
| POST   | `/games`          | cria jogo (`422` sem nome, `409` se já existe) |
| GET    | `/characters`     | lista com `race` e `race_id` |
| GET    | `/characters/:id` | personagem + `games` |
| GET    | `/races`          | lista com `members` (`{ id, name }`) |
| GET    | `/races/:id`      | raça + `members` |
| GET    | `/bosses`         | lista com `games` |
| GET    | `/bosses/:id`     | boss + `games` |

- As rotas antigas (`/game/:id`, `/character/:name`, `/race/:name`, `/new/game`) foram removidas; o único cliente é o nosso front, atualizado junto.
- IDs que não são inteiros positivos devolvem `404`.

### Execução

- A API roda com **`tsx`** (`npm start` / `npm run dev`), que permite importar o client gerado em TS a partir do JavaScript sem etapa de build.
- Conexão via `@prisma/adapter-pg` + `pg`, lendo `DATABASE_URL`. A porta vem de `PORT` (padrão `3000`).
- O front lê a URL da API de `VITE_API_URL` (padrão `http://localhost:3000`).

## Consequências

- **Positivas:** o front faz uma requisição por tela, sem mesclar fontes; seed reprodutível e offline; relações garantidas por FK.
- **Negativas:** URLs antigas de personagens (por nome) deixam de funcionar; `tsx` vira dependência de produção.
- **Riscos:** os IDs seriais dependem da ordem do seed — num banco novo eles se repetem, mas não são garantidos entre bancos diferentes.

## Alternativas consideradas

- **Gerador `prisma-client-js`:** gera JS, mas está obsoleto no Prisma 7.
- **Converter a API para TypeScript com build:** mais robusto a longo prazo, mas fora do escopo da migração.
- **Buscar o fanapis ao vivo no seed:** sempre atualizado, mas contraria a decisão de importação única e depende da rede.
