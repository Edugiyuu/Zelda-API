import { prisma } from "../db.js";
import { bossInclude, toBoss } from "./serializers.js";

export const getBosses = async (req, res) => {
  try {
    const bosses = await prisma.boss.findMany({ include: bossInclude, orderBy: { id: 'asc' } });

    res.json(bosses.map(toBoss));
  } catch (error) {
    res.status(500).json({ msg: "Erro ao buscar bosses", error: error.message });
  }
}
