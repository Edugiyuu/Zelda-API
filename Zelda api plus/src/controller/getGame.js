import Game from "../models/Game.js";

export const getGame = async (req, res) => {
  const id = req.params.id;

  try {
   
    const game = await Game.findOne({ id: id });
    
    if (!game) {
      return res.status(404).json({ error: 'Jogo não encontrado' });
    }

    res.json(game);

  } catch (error) {
   
    res.status(500).json({ msg: "Erro ao buscar jogo", error: error.message });
  }
};
