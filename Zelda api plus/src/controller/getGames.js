import { prisma } from "../db.js";
import { toGame } from "./serializers.js";

export const getGames = async (req, res) => {
  try {
    const games = await prisma.game.findMany({ orderBy: { id: 'asc' } });

    res.json(games.map(toGame));
  } catch (error) {
    res.status(500).json({ msg: "Erro ao buscar jogos", error: error.message });
  }
}
