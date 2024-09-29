import express from 'express';
import { postGame } from '../controller/postGame.js';
import { getGames } from '../controller/getGames.js';
import cors from 'cors';
import { getGame } from '../controller/getGame.js';
import { getCharacters } from '../controller/getCharacters.js';

const router = express.Router();
router.use(express.json());
router.use(cors());


//-----------------Games-------------------
router.get("/new/game",postGame);
router.get("/games",getGames);
router.get("/game/:id",getGame);
//------------------------------------------

//----------------Characters-----------------
router.get("/characters",getCharacters);
//-------------------------------------------

export default router;