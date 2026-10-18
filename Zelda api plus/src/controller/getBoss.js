import { prisma } from "../db.js";
import { bossInclude, parseId, toBoss } from "./serializers.js";

export const getBoss = async (req, res) => {
  const id = parseId(req.params.id);

  try {
    const boss = id && await prisma.boss.findUnique({ where: { id }, include: bossInclude });

    if (!boss) {
      return res.status(404).json({ error: 'Boss não encontrado' });
    }

    res.json(toBoss(boss));
  } catch (error) {
    res.status(500).json({ msg: "Erro ao buscar boss", error: error.message });
  }
};
