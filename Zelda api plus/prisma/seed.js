// Popula o PostgreSQL com os dados dos antigos seeds do MongoDB e com o snapshot do zelda.fanapis.com.
// Pode rodar várias vezes: tudo é feito com upsert pelo nome.
import { prisma } from '../src/db.js';
import races from './data/races.js';
import characters from './data/characters.js';
import games from './data/games.js';
import fanGames from './data/fanapis-games.json' with { type: 'json' };
import fanBosses from './data/fanapis-bosses.json' with { type: 'json' };

// Registros que o fanapis lista como bosses, mas não são inimigos (ou não têm arte).
const NOT_BOSSES = ['Agitha', 'Glutko', 'Princess Zelda', 'Mazura', 'Big Liar', 'Midna', 'Moldorm', 'Big Pengator'];

const clean = (text) => (typeof text === 'string' ? text.trim() || null : null);
const singular = (name) => name.replace(/s$/, '');
/** Tira espaços de todos os campos de texto (o fanapis tem vários " November 20, 2011"). */
const trimAll = (record) => Object.fromEntries(Object.entries(record).map(([key, value]) => [key, typeof value === 'string' ? clean(value) : value]));

async function seedRaces() {
  const ids = new Map();
  for (const race of races) {
    const data = { ...race, name: race.name.trim(), description: clean(race.description) };
    const { id, name } = await prisma.race.upsert({ where: { name: data.name }, update: data, create: data });
    ids.set(name, id);
  }
  // Raças citadas pelos personagens que ainda não têm ficha viram registros só com o nome.
  for (const raceName of new Set(characters.map((c) => c.race).filter(Boolean))) {
    const known = [...ids.keys()].find((n) => n === raceName || singular(n) === raceName);
    if (known) { ids.set(raceName, ids.get(known)); continue; }
    const { id } = await prisma.race.upsert({ where: { name: raceName }, update: {}, create: { name: raceName } });
    ids.set(raceName, id);
  }
  return ids;
}

async function seedCharacters(raceIds) {
  for (const { race, ...character } of characters) {
    const data = { ...character, description: clean(character.description), race_id: raceIds.get(race) ?? null };
    await prisma.character.upsert({ where: { name: data.name }, update: data, create: data });
  }
}

async function seedGames() {
  const byFanId = new Map();
  // O fanapis tem "Tri Force Heroes" duplicado: os dois IDs apontam para o mesmo jogo.
  for (const { fanapis_id, ...game } of fanGames) {
    const data = trimAll(game);
    const { id } = await prisma.game.upsert({ where: { name: data.name }, update: data, create: data });
    byFanId.set(fanapis_id, id);
  }
  for (const game of games) {
    const data = trimAll(game);
    await prisma.game.upsert({ where: { name: data.name }, update: data, create: data });
  }
  return byFanId;
}

async function seedBosses(gameIds) {
  for (const boss of fanBosses.filter((b) => !NOT_BOSSES.includes(b.name))) {
    const data = { name: boss.name.trim(), description: clean(boss.description) };
    const { id } = await prisma.boss.upsert({ where: { name: data.name }, update: data, create: data });
    const gamesOf = new Set(boss.appearances.map((url) => gameIds.get(url.split('/').pop())).filter(Boolean));
    await prisma.bossAppearance.createMany({
      data: [...gamesOf].map((game_id) => ({ boss_id: id, game_id })),
      skipDuplicates: true,
    });
  }
}

try {
  const raceIds = await seedRaces();
  await seedCharacters(raceIds);
  const gameIds = await seedGames();
  await seedBosses(gameIds);
  const counts = await Promise.all([prisma.race.count(), prisma.character.count(), prisma.game.count(), prisma.boss.count()]);
  console.log('Seed concluído — raças: %d, personagens: %d, jogos: %d, bosses: %d', ...counts);
} finally {
  await prisma.$disconnect();
}
