import express from 'express';
import { postGame } from '../controller/postGame.js';

import cors from 'cors';

const router = express.Router();
router.use(express.json());
router.use(cors());


//-----------------UserId-------------------
router.get("/new/game",postGame);
//------------------------------------------


export default router;