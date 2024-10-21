import Race from "../models/Race.js";

export const getRaces = async (req, res) => {
  try {
    const races = await Race.find(); 
  
    res.json(races); 
  } catch (error) {
    res.status(500).json({ msg: "Erro", error: error.message });
  }
}
