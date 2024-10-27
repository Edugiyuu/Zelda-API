import mongoose from 'mongoose';
import dotenv from 'dotenv';
/* import Character from '../models/Character.js'; */
import Race from '../models/Race.js';

dotenv.config();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;

mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.4mdpo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`,)
  .then(() => {
    console.log('Conectou ao mongoDB');
    seedRaces();
  }).catch((err) => {
    console.error('Erro', err);
  });
/* {
    name: String,
    description: String,
    habitat: String,
    characteristics:String,
    members:String,
    imgs:[]
}, */
const races = [
  {
    name: "Humans",
    description: "Humans, also known as Human Beings, are both a species and a non specific recurring race in the The Legend of Zelda series. Humans go unnamed in A Link to the Past, Link's Awakening, Oracle of Seasons, Oracle of Ages, The Wind Waker, The Minish Cap, and Tri Force Heroes. Unlike Hylians, who are more prolific and possess wide, pointed ears, Humans have rounded ears and are much less commonly seen in the series. The term Human is occasionally used to refer to Hylians and is frequently employed as an umbrella term for multiple humanoid races.",
    habitat: "Various",
    characteristics: "Humans are for the most part identical to Hylians, with the sole exception being their small, rounded ears in contrast to the Hylians' pointed ears.",
    members: "",
    imgs: [
      "https://static.wikia.nocookie.net/zelda_gamepedia_en/images/9/9f/HumanSpecies.png/revision/latest?cb=20190321162238&format=original",
    ],
    id: "bvncmdf6ytghvnnbjfigu",
  },
  {
    name: "Hylians",
    description: " In the past, Hylians were able to wield magic of considerable might, but, over time, that ability has faded. However, because they are of Hylia's bloodline, the royal family, especially its princesses, are still strong in magic. In addition, some sages and shrine maidens have also been able to wield magic, an ability that brought them considerable honor in Hylian society.[5] The most famous Hylians are the many heroes and princesses that share the same name as one another, the latter being of blood relation and naming tradition",
    habitat: "Various",
    characteristics: "Hylians have pointed ears, and generally have a wide degree of variety of skin and eye colors.",
    members: "",
    imgs: [
      "https://static.wikia.nocookie.net/zelda_gamepedia_en/images/c/ca/HylianSpecies.png/revision/latest?cb=20190321161817&format=original",
    ],
    id: "bvncmdf6ytghvnnbjfigu",
  },

];

async function seedRaces() {
  try {
    await Race.insertMany(races);
    console.log('Dados inseridos com sucesso!');
    mongoose.disconnect();
  } catch (error) {
    console.error('Erro ao inserir dados:', error);
  }
}
