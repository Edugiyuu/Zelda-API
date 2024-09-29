import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Character from '../models/Character.js';

dotenv.config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.4mdpo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,)
.then(() => {
  console.log('Conectou ao mongoDB');
  seedCharacters();
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
const characters = [
    {
        name: "Zelda",
        description: "Zelda traditionally Princess Zelda, is the eponymous deuteragonist of The Legend of Zelda series. With the exception of Link's Awakening, Majora's Mask, and Tri Force Heroes, an incarnation of Zelda or one of her alter egos (such as Tetra) has always been one of the central characters in the series. Usually but not always, Princess Zelda is the one who sends Link on his mission to save Hyrule and assists him in defeating Ganon. She is also often the possessor of the Triforce of Wisdom. Much like Link, various Princess Zeldas have appeared across the history of Hyrule. While each Zelda is a distinct individual, the fundamental soul of Zelda has endured from one incarnation to the next.",
        Age: "Unknown (varies between games)",
        gender: "Female",
        race: "Hylian",
        id: "002ijf20je10293lzb08",
        visuals: [
            'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/1/1d/SS_Zelda_Artwork.png' ,
            'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/a/af/OoS_Zelda_Artwork.png' ,
            'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/c/c9/TotK_Princess_Zelda_Artwork.png' ,
            'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/d/dc/Link_To_The_Past_Remake_-_Princess_Zelda.png' ,
        ]
    },
    {
        name: "Link",
        description: "Link is the main character and protagonist of the The Legend of Zelda series. He has appeared across many incarnations throughout the series, which, depending on the game, depicted as an ordinary boy or younger man, who becomes a legendary hero by saving the world through incredible feats of courage and bravery. He is most often the holder of the Triforce of Courage, a sign of his being chosen by the Golden Goddesses. As an adventurous swordsman, Link is almost always seen wielding a sword and shield, usually the Master Sword and Hylian Shield, and has exceptional skill surpassing other proficient sword-wielding fighters such as the Gerudo and even Ganondorf. He is also talented at stealth, as an archer, and using magic (though not to the same degree as Ganon or Princess Zelda, who themselves bear the Triforce of Power and Wisdom, respectively) Specific incarnations of Link may be distinguished by titles such as the iconic Hero of Time in Ocarina of Time and the Hero of Winds in The Wind Waker. All incarnations of Link possess the spirit of the Legendary Hero and are thereby destined to fight evil, specifically his arch-nemesis Ganon, usually under Princess Zelda's orders.",
        Age: "Unknown (varies between games)",
        gender: "Male",
        race: "Hylian",
        id: "002ijf20je10293lzb08",
        visuals: [
            'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/7/7c/OoT_Child_Link_Artwork.png',
            'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/2/29/OoT_Link_Artwork.png',
            'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/f/f4/MM3D_Link_Model.png',
            'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/1/1e/ALBW_Link_Artwork.png',
            'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/4/47/TLoZ_Series_Link_Render.png',
            'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/0/05/MM3D_Link_Masks_Artwork.png',
           
            
        ]
    },
    {
        name: "Saria",
        description: "Saria is Link's childhood friend from his earliest years in the Kokiri Forest. She is well-liked amongst other Kokiri, particularly by their boss, Mido, whose dislike of Link might be partially explained by the latter's close friendship with Saria. She often travels to the Sacred Forest Meadow to play her Ocarina.[6] She plays a song that inspires people to dance called Saria's Song. When Link becomes the Hero of Time, he rescues Saria from the Forest Temple and allows her to awaken as the Forest Sage.",
        Age: "Unknown",
        gender: "Female",
        race: "Kokiri",
        id: "0987ytrfdvgh2gs",
        visuals: [
            'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/c/c3/OoT3D_Saria_Model.png',
        ]
    },
    {
        name: "Malon",
        description: "Malon is a recurring character in The Legend of Zelda series. In the majority of games she has appeared in, she is the daughter of the rancher Talon, who owns Lon Lon Ranch. Portrayed as a kind-hearted and responsible girl, Malon is often seen taking care of Epona, one of the horses of Lon Lon Ranch She also enjoys singing, specifically Epona's Song.",
        Age: "Unknown",
        gender: "Female",
        race: "Hylian",
        id: "po2i23uy6trf3951nv1",
        visuals: [
            'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/2/28/OoT_Malon_Artwork.png',
        ]
    },
    {
        name: "Skull Kid",
        description: "Skull Kids are recurring creatures in The Legend of Zelda series. In their first appearance in Ocarina of Time, Skull Kids have black-skinned faces with large orange lips. Navi implies that children who wander into the Lost Woods become Skull Kids. One certain individual first interacts with Link in Ocarina of Time, and later plays a major villainous role in Majora's Mask. Skull Kids dress in a red cloak and hat covering an underlayer of clothing composed of a straw-like material, and play a flute, which they can also use as a weapon to shoot projectiles.",
        Age: "Unknown",
        gender: "Unknown",
        race: "Kokiri",
        id: "09nbvmkde948tughd21",
        visuals: [
            'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/8/84/MM_Skull_Kid_Artwork.png',
            'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/2/21/MM3D_Skull_Kid_Artwork.png'
        ]
    },
    {
        name: "Happy Mask Salesman",
        description: "Skull Kids are recurring creatures in The Legend of Zelda series. In their first appearance in Ocarina of Time, Skull Kids have black-skinned faces with large orange lips. Navi implies that children who wander into the Lost Woods become Skull Kids. One certain individual first interacts with Link in Ocarina of Time, and later plays a major villainous role in Majora's Mask. Skull Kids dress in a red cloak and hat covering an underlayer of clothing composed of a straw-like material, and play a flute, which they can also use as a weapon to shoot projectiles.",
        Age: "Unknown",
        gender: "Male",
        race: "Hylian",
        id: "0olh7vbnfd823mewki12",
        visuals: [
            'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/9/98/MM3D_Happy_Mask_Salesman_Artwork.png',
            'https://static.wikia.nocookie.net/zelda_gamepedia_en/images/5/50/MM_Happy_Mask_Salesman_Artwork.png'
        ]
    },
    
  
];

async function seedCharacters() {
  try {
    await Character.insertMany(characters);
    console.log('Dados inseridos com sucesso!');
    mongoose.disconnect();
  } catch (error) {
    console.error('Erro ao inserir dados:', error);
  }
}
