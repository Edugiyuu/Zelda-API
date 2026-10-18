import { prisma } from "../db.js";
import { parseId, raceInclude, toRace } from "./serializers.js";

export const getRace = async (req, res) => {
  const id = parseId(req.params.id);

  try {
    const race = id && await prisma.race.findUnique({ where: { id }, include: raceInclude });

    if (!race) {
      return res.status(404).json({ error: 'Raça não encontrada' });
    }

    res.json(toRace(race));
  } catch (error) {
    res.status(500).json({ msg: "Erro ao buscar raça", error: error.message });
  }
};
