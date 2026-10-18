import { prisma } from "../db.js";
import { toGame } from "./serializers.js";

const FIELDS = ['description', 'developer', 'publisher', 'released_date', 'box_img', 'game_title_img'];

export const postGame = async (req, res) => {
  const name = typeof req.body?.name === 'string' ? req.body.name.trim() : '';

  if (!name) {
    return res.status(422).json({ msg: 'O nome do jogo é obrigatório' });
  }

  try {
    const gameExists = await prisma.game.findUnique({ where: { name } });

    if (gameExists) {
      return res.status(409).json({ msg: 'Já existe um jogo com esse nome' });
    }

    const data = { name };
    for (const field of FIELDS) {
      if (typeof req.body[field] === 'string') data[field] = req.body[field];
    }

    const game = await prisma.game.create({ data });
    res.status(201).json(toGame(game));
  } catch (error) {
    res.status(500).json({ msg: "Erro ao salvar jogo", error: error.message });
  }
}
