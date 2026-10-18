import { prisma } from "../db.js";
import { raceInclude, toRace } from "./serializers.js";

export const getRaces = async (req, res) => {
  try {
    const races = await prisma.race.findMany({ include: raceInclude, orderBy: { id: 'asc' } });

    res.json(races.map(toRace));
  } catch (error) {
    res.status(500).json({ msg: "Erro ao buscar raças", error: error.message });
  }
}
