// Formato do JSON que o front consome (web/src/api.ts).
// Relações viram listas curtas de { id, name } para o front montar os links.

const ref = ({ id, name }) => ({ id, name });
const byName = (a, b) => a.name.localeCompare(b.name);

/** Lê o :id da URL; devolve null se não for um inteiro positivo. */
export const parseId = (value) => {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
};

export const characterInclude = { race: { select: { id: true, name: true } } };

export const toCharacter = ({ race, appearances, ...character }) => ({
  ...character,
  race: race?.name ?? null,
  ...(appearances && { games: appearances.map((a) => ref(a.game)).sort(byName) }),
});

export const raceInclude = { characters: { select: { id: true, name: true }, orderBy: { name: 'asc' } } };

export const toRace = ({ characters, ...race }) => ({ ...race, members: characters.map(ref) });

export const bossInclude = { appearances: { select: { game: { select: { id: true, name: true } } } } };

export const toBoss = ({ appearances, ...boss }) => ({ ...boss, games: appearances.map((a) => ref(a.game)).sort(byName) });

export const toGame = ({ appearances, bosses, ...game }) => ({
  ...game,
  ...(appearances && { characters: appearances.map((a) => ref(a.character)).sort(byName) }),
  ...(bosses && { bosses: bosses.map((a) => ref(a.boss)).sort(byName) }),
});
