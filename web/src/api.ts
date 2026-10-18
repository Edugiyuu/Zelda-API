export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';

/** A related record, as embedded by the API ({ id, name }). */
export interface Ref {
    id: number
    name: string
}

export interface Game {
    id: number
    name: string
    description: string
    developer: string
    publisher: string
    released_date: string
    game_title_img?: string | null
    box_img?: string | null
    /** Only on GET /games/:id. */
    characters?: Ref[]
    bosses?: Ref[]
}

export interface Character {
    id: number
    name: string
    description: string
    age: string
    gender: string
    race_id: number | null
    race: string | null
    visuals: string[]
    /** Only on GET /characters/:id. */
    games?: Ref[]
}

/** Races without a description are only known by name (characters cite them, but there is no entry yet). */
export interface Race {
    id: number
    name: string
    description: string | null
    habitat: string | null
    characteristics: string | null
    imgs: string[]
    members: Ref[]
}

export interface Boss {
    id: number
    name: string
    description: string
    games: Ref[]
}

const getJson = <T,>(url: string): Promise<T> => fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${response.status} ${url}`);
    return response.json();
});

export const getGames = () => getJson<Game[]>(`${API_URL}/games`);
export const getGame = (id: string | number) => getJson<Game>(`${API_URL}/games/${id}`);
export const getCharacters = () => getJson<Character[]>(`${API_URL}/characters`);
export const getCharacter = (id: string | number) => getJson<Character>(`${API_URL}/characters/${id}`);
export const getRaces = () => getJson<Race[]>(`${API_URL}/races`);
export const getBosses = () => getJson<Boss[]>(`${API_URL}/bosses`);

/** Local art in /public is named after the game without the ":" characters. */
export const gameAsset = (folder: 'GameIcons' | 'BoxArt', name: string) => `/${folder}/${name.replace(/:/g, '')}.png`;
export const characterImage = (character: Pick<Character, 'name'>) => `/Characters/${character.name}.png`;
export const yearOf = (date: string) => (String(date || '').match(/\d{4}/) || [''])[0];
export const compendiumNo = (index: number, digits = 3) => `No. ${String(index + 1).padStart(digits, '0')}`;
