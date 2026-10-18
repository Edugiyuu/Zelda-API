import { prisma } from "../db.js";
import { parseId, toGame } from "./serializers.js";

export const getGame = async (req, res) => {
  const id = parseId(req.params.id);

  try {
    const game = id && await prisma.game.findUnique({
      where: { id },
      include: {
        appearances: { select: { character: { select: { id: true, name: true } } } },
        bosses: { select: { boss: { select: { id: true, name: true } } } },
      },
    });

    if (!game) {
      return res.status(404).json({ error: 'Jogo não encontrado' });
    }

    res.json(toGame(game));
  } catch (error) {
    res.status(500).json({ msg: "Erro ao buscar jogo", error: error.message });
  }
};
