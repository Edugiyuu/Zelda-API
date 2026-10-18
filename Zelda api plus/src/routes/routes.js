import express from 'express';
import { postGame } from '../controller/postGame.js';
import { getGames } from '../controller/getGames.js';
import { getGame } from '../controller/getGame.js';
import { getCharacters } from '../controller/getCharacters.js';
import { getCharacter } from '../controller/getCharacter.js';
import { getRaces } from '../controller/getRaces.js';
import { getRace } from '../controller/getRace.js';
import { getBosses } from '../controller/getBosses.js';
import { getBoss } from '../controller/getBoss.js';

const router = express.Router();

//-----------------Games-------------------
router.get("/games",getGames);
router.post("/games",postGame);
router.get("/games/:id",getGame);
//------------------------------------------

//----------------Characters-----------------
router.get("/characters",getCharacters);
router.get("/characters/:id",getCharacter);
//-------------------------------------------

//---------------Races----------------------
router.get("/races",getRaces);
router.get("/races/:id",getRace);
//------------------------------------------

//---------------Bosses---------------------
router.get("/bosses",getBosses);
router.get("/bosses/:id",getBoss);
//------------------------------------------
export default router;
