import mongoose from "mongoose";
import Game from './models/Game.js';
import dotenv from 'dotenv';

dotenv.config();

// Conecta-se ao banco de dados MongoDB
mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.4mdpo.mongodb.net/?retryWrites=true&w=majority`
).then(() => {
  console.log('Conectado ao MongoDB');

  // Dados de exemplo dos jogos de Zelda
  const games = [
    {
      name: 'The Legend of Zelda',
      description: 'O primeiro jogo da série The Legend of Zelda.',
      developer: 'Nintendo',
      publisher: 'Nintendo',
      released_date: '1986-02-21',
      box_img: 'https://exemplo.com/img/zelda1.jpg',
      game_title_img: 'https://exemplo.com/img/zelda1-title.jpg',
      id: '1'
    },
    {
      name: 'Zelda II: The Adventure of Link',
      description: 'Sequência de The Legend of Zelda com uma abordagem diferente.',
      developer: 'Nintendo',
      publisher: 'Nintendo',
      released_date: '1987-01-14',
      box_img: 'https://exemplo.com/img/zelda2.jpg',
      game_title_img: 'https://exemplo.com/img/zelda2-title.jpg',
      id: '2'
    },
    {
      name: 'The Legend of Zelda: A Link to the Past',
      description: 'O terceiro jogo da série, com uma visão superior e jogabilidade clássica.',
      developer: 'Nintendo',
      publisher: 'Nintendo',
      released_date: '1991-11-21',
      box_img: 'https://exemplo.com/img/zelda3.jpg',
      game_title_img: 'https://exemplo.com/img/zelda3-title.jpg',
      id: '3'
    },
    {
      name: 'The Legend of Zelda: Ocarina of Time',
      description: 'Um dos jogos mais aclamados de todos os tempos, em 3D no Nintendo 64.',
      developer: 'Nintendo',
      publisher: 'Nintendo',
      released_date: '1998-11-21',
      box_img: 'https://exemplo.com/img/ocarina.jpg',
      game_title_img: 'https://exemplo.com/img/ocarina-title.jpg',
      id: '4'
    },
    {
      name: 'The Legend of Zelda: Breath of the Wild',
      description: 'Um dos jogos mais inovadores da série Zelda, mundo aberto no Switch.',
      developer: 'Nintendo',
      publisher: 'Nintendo',
      released_date: '2017-03-03',
      box_img: 'https://exemplo.com/img/breath-of-the-wild.jpg',
      game_title_img: 'https://exemplo.com/img/breath-of-the-wild-title.jpg',
      id: '5'
    }
  ];

  return Game.insertMany(games);
}).then(() => {
  console.log('sucesso!');
  mongoose.connection.close(); 
}).catch((err) => {
  console.error('Erro:', err);
  mongoose.connection.close(); 
});
