import { prisma } from "../db.js";
import { characterInclude, parseId, toCharacter } from "./serializers.js";

export const getCharacter = async (req, res) => {
  const id = parseId(req.params.id);

  try {
    const character = id && await prisma.character.findUnique({
      where: { id },
      include: { ...characterInclude, appearances: { select: { game: { select: { id: true, name: true } } } } },
    });

    if (!character) {
      return res.status(404).json({ error: 'Personagem não encontrado' });
    }

    res.json(toCharacter(character));
  } catch (error) {
    res.status(500).json({ msg: "Erro ao buscar personagem", error: error.message });
  }
};
