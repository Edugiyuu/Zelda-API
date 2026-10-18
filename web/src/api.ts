export const API_URL = 'http://localhost:3000';
export const FAN_API_URL = 'https://zelda.fanapis.com/api';

export interface Game {
    id: string
    name: string
    description: string
    developer: string
    publisher: string
    released_date: string
    game_title_img?: string
    box_img?: string
}

export interface Character {
    id: string
    name: string
    description: string
    age: string
    gender: string
    race: string
    visuals: string[]
}

export interface Race {
    id: string
    name: string
    description: string
    habitat: string
    characteristics: string
    imgs: string[]
}

export interface Boss {
    id: string
    name: string
    description: string
    appearances: string[]
}

const getJson = <T,>(url: string): Promise<T> => fetch(url).then((response) => response.json());

export const getFanGames = () => getJson<{ data: Game[] }>(`${FAN_API_URL}/games?limit=100`).then((r) => r.data);
export const getFanGame = (id: string) => getJson<{ data: Game | null }>(`${FAN_API_URL}/games/${id}`).then((r) => r.data);
export const getFanBosses = () => getJson<{ data: Boss[] }>(`${FAN_API_URL}/bosses?limit=100`).then((r) => r.data);
export const getGames = () => getJson<Game[]>(`${API_URL}/games`);
export const getGame = (id: string) => getJson<Game | null>(`${API_URL}/game/${id}`);
export const getCharacters = () => getJson<Character[]>(`${API_URL}/characters`);
export const getCharacter = (name: string) => getJson<Character | null>(`${API_URL}/character/${name}`);
export const getRaces = () => getJson<Race[]>(`${API_URL}/races`);

/** Fan API games plus the ones only stored in our database (deduplicated by name). */
export const getAllGames = () => Promise.all([getFanGames().catch(() => [] as Game[]), getGames().catch(() => [] as Game[])])
    .then(([fan, ours]) => {
        const names = new Set(fan.map((g) => g.name));
        return [...fan, ...ours.filter((g) => !names.has(g.name))];
    });

// Entries the fan API lists as bosses that are not really foes (or have no art yet).
const NOT_BOSSES = ["Agitha", "Glutko", "Princess Zelda", "Mazura", "Big Liar", "Midna", "Moldorm", "Big Pengator"];
export const getBosses = () => getFanBosses().then((list) => list.filter((b) => !NOT_BOSSES.includes(b.name)));

/** Local art in /public is named after the game without the ":" characters. */
export const gameAsset = (folder: 'GameIcons' | 'BoxArt', name: string) => `/${folder}/${name.replace(/:/g, '')}.png`;
export const characterImage = (character: Character) => `/Characters/${character.name}.png`;
export const yearOf = (date: string) => (String(date || '').match(/\d{4}/) || [''])[0];
export const compendiumNo = (index: number, digits = 3) => `No. ${String(index + 1).padStart(digits, '0')}`;
