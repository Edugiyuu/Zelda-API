import { prisma } from "../db.js";
import { characterInclude, toCharacter } from "./serializers.js";

export const getCharacters = async (req, res) => {
  try {
    const characters = await prisma.character.findMany({ include: characterInclude, orderBy: { id: 'asc' } });

    res.json(characters.map(toCharacter));
  } catch (error) {
    res.status(500).json({ msg: "Erro ao buscar personagens", error: error.message });
  }
}
