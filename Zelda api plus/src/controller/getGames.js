import Game from "../models/Game.js";

export const getGames = async (req, res) => {
  try {
    const games = await Game.find(); 
  
    res.json(games); 
  } catch (error) {
    res.status(500).json({ msg: "Erro ao buscar jogos", error: error.message });
  }
}
