import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Game from '../models/Game.js';

dotenv.config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.4mdpo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,)
.then(() => {
  console.log('Conectou ao mongoDB');
  seedGames();
}).catch((err) => {
  console.error('Erro', err);
});
/* {
  name: "",
  description: "",
  developer: "",
  publisher: "",
  released_date: "",
  box_img: "",
  game_title_img: "",
  id: ""
}, */
const games = [
  {
    name: "The Legend of Zelda: Tears of the Kingdom",
    description: "The announcement of Tears of the Kingdom under the name Breath of the Wild 2 which Nintendo Called at the time The Sequel to Breath of the Wild was celebrated by fans across the world...",
    developer: "Nintendo EPD",
    publisher: "Nintendo",
    released_date: "May 12, 2023",
    box_img: "https://static.wikia.nocookie.net/zelda_gamepedia_en/images/9/9f/The_Legend_of_Zelda_TOTK_%28NA_cover_art%29.png",
    game_title_img: "https://static.wikia.nocookie.net/zelda_gamepedia_en/images/4/4c/TotK_English_Logo.png",
    id: "g3fo2jfo5khnvs93iff2v6"
  },
  {
    name: "The Legend of Zelda: Link's Awakening (Nintendo Switch)",
    description: "Link's Awakening for Nintendo Switch was first teased by series producer Eiji Aonuma during an interview with EDGE magazine in 2016. The game was officially announced during a Nintendo Direct on February 13, 2019. Its release date was announced during E3 2019. Eiji Aonuma decided to remake Link's Awakening as he considers the original game hard to get many years after its release.",
    developer: "Grezzo",
    publisher: "Nintendo",
    released_date: "September 20, 2019",
    box_img: "https://static.wikia.nocookie.net/zelda_gamepedia_en/images/5/55/LANS_NA_Box_Art.png",
    game_title_img: "https://static.wikia.nocookie.net/zelda_gamepedia_en/images/7/70/LANS_English_Logo_2.png",
    id: "ho29g0vjs0e20gj10vbq"
  },
  {
    name: "The Legend of Zelda: Majora's Mask 3D",
    description: "Eiji Aonuma, producer of The Legend of Zelda series...",
    developer: "Grezzo",
    publisher: "Nintendo",
    released_date: "February 13, 2015",
    box_img: "https://static.wikia.nocookie.net/zelda_gamepedia_en/images/a/a5/MM3D_NA_Box_Art.png",
    game_title_img: "https://static.wikia.nocookie.net/zelda_gamepedia_en/images/c/c5/MM3D_English_Logo.png",
    id: "ovh10jv1fob2v71pva11"
  },
  {
    name: "The Legend of Zelda: Ocarina of Time 3D",
    description: "The Legend of Zelda: Ocarina of Time 3D is a Nintendo 3DS remake of the 1998 Nintendo 64 game, Ocarina of Time. It was officially announced in E3 2010, where only a couple of screenshots of the introduction were released. In the 2011 Game Developers' Conference, Satoru Iwata hinted at a June release date.Japan's release date was later confirmed to be June 16, 2011, followed by the European release date on June 17 and finally releasing in the U.S. on June 19, 2011. The game also includes Master Quest, which was originally released for the Nintendo GameCube.",
    developer: "Grezzo",
    publisher: "Nintendo",
    released_date: "June 19, 2011",
    box_img: "https://static.wikia.nocookie.net/zelda_gamepedia_en/images/8/88/OoT_3D_Box_Art.png",
    game_title_img: "https://static.wikia.nocookie.net/zelda_gamepedia_en/images/1/14/OoT3D_English_Logo.png",
    id: "niu12h9d12jd01cgr"
  },
  {
    name: "The Legend of Zelda: The Wind Waker HD",
    description: "The Wind Waker HD first became available on September 20, 2013 as a digital download from the North American Nintendo eShop. Two limited edition bundles of the game—one a special edition Wii U Deluxe Set, the other including an exclusive figurine of Ganondorf—were also released in North America and Europe.The remaster has more detailed graphics than the original, namely rendering at a higher resolution, a new lighting engine and higher resolution textures. Some changes to gameplay were also made, the most significant of which include new items—namely the Swift Sail, the Tingle Bottle, and an improved Picto Box—as well as the addition of a Hero Mode.",
    developer: "Nintendo EAD",
    publisher: "Nintendo",
    released_date: "September 20, 2013",
    box_img: "https://static.wikia.nocookie.net/zelda_gamepedia_en/images/c/c8/TWWHD_Boxart.png",
    game_title_img: "https://static.wikia.nocookie.net/zelda_gamepedia_en/images/8/80/TWWHD_English_Logo.png",
    id: "v1f91u401fc0g8195g"
  },
  {
    name: "The Legend of Zelda: Twilight Princess HD",
    description: "The Legend of Zelda: Twilight Princess HD is a Wii U enhanced remaster of the Nintendo GameCube and Wii game, Twilight Princess. It was officially announced via a Nintendo Direct webcast on November 12, 2015 and was released on March 4, 2016. It is the second remaster of a Zelda title on the Wii U following The Wind Waker HD. A bundle set containing the Wolf Link amiibo was also released. The game features graphical upgrades from the original version and runs at a higher resolution. It also features some gameplay changes.",
    developer: "Tantalus Media and Nintendo EPD",
    publisher: "Nintendo",
    released_date: "March 4, 2016",
    box_img: "https://static.wikia.nocookie.net/zelda_gamepedia_en/images/4/42/TPHD_NA_Box_Art.png",
    game_title_img: "https://static.wikia.nocookie.net/zelda_gamepedia_en/images/0/01/TPHD_English_Logo.png",
    id: "np30g8vxb625205vl"
  },
  {
    name: "The Legend of Zelda: Skyward Sword HD",
    description: "The Legend of Zelda: Skyward Sword HD is a remaster of the 2011 game Skyward Sword released on the Nintendo Switch. It was officially announced via a Nintendo Direct webcast on February 17, 2021 and was released on July 16, 2021. The remaster features enhanced graphics and improved quality-of-life features.",
    developer: "Tantalus Media",
    publisher: "Nintendo",
    released_date: "July 16, 2021",
    box_img: "https://static.wikia.nocookie.net/zelda_gamepedia_en/images/b/bd/SSHD_NA_Box_Art.png",
    game_title_img: "https://static.wikia.nocookie.net/zelda_gamepedia_en/images/e/e9/SSHD_English_Logo.png",
    id: "03kgoçiwnv937gsvx"
  },
  {
    name: "Cadence of Hyrule: Crypt of the NecroDancer feat. The Legend of Zelda",
    description: "Cadence of Hyrule: Crypt of the NecroDancer feat. The Legend of Zelda is a game for the Nintendo Switch, developed by Brace Yourself Games. It is a crossover spin-off of The Legend of Zelda series and Crypt of the NecroDancer. The game is a roguelike, dungeon crawling, action-adventure rhythm game. It was officially announced during a Nindies Showcase on March 20, 2019.",
    developer: "Brace Yourself Games",
    publisher: "Nintendo",
    released_date: "June 13, 2019",
    box_img: "https://static.wikia.nocookie.net/zelda_gamepedia_en/images/f/fb/CoH_NA_Box_Art.png",
    game_title_img: "https://static.wikia.nocookie.net/zelda_gamepedia_en/images/d/d5/CoH_English_Logo.png",
    id: "004uj28fmbh72jcps2"
  },
  {
    name: "Hyrule Warriors: Definitive Edition",
    description: "Hyrule Warriors: Definitive Edition is a port and adaptation of Hyrule Warriors and Hyrule Warriors Legends for the Nintendo Switch. It includes all previously released content from both games, including every map, character, mission, and downloadable content. This puts the amount of playable Warriors at a total of 29. The game features 1080p HD resolution in TV mode and 2 player split-screen multiplayer on one Nintendo Switch console both in TV mode and on the device itself, and can be played with a single Joy-Con controller.",
    developer: "Omega Force, Team Ninja and Koei Tecmo Games",
    publisher: "Nintendo",
    released_date: "May 18, 2018",
    box_img: "https://static.wikia.nocookie.net/zelda_gamepedia_en/images/0/0a/HWDE_NA_Box_Art.png",
    game_title_img: "https://static.wikia.nocookie.net/zelda_gamepedia_en/images/8/8c/HWDE_English_Logo.png",
    id: "0b20hh10fu1gfm5vdd24"
  },
  
];

async function seedGames() {
  try {
    await Game.insertMany(games);
    console.log('Dados inseridos com sucesso!');
    mongoose.disconnect();
  } catch (error) {
    console.error('Erro ao inserir dados:', error);
  }
}
