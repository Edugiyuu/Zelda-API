import Character from "../models/Character.js";

export const getCharacter = async (req, res) => {
  const id = req.params.id;

  try {
   
    const character = await Character.findOne({ id: id });
    
    if (!character) {
      return res.status(404).json({ error: 'Pesonagem não encontrado' });
    }

    res.json(character);

  } catch (error) {
   
    res.status(500).json({ msg: "Erro ao buscar personagem", error: error.message });
  }
};
