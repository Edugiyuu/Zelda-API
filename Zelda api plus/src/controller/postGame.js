import Game from "../models/Game.js";

//app.post('/new/game', async(req,res) =>{
    export const postGame = async (req,res)=>{
  const {name} = req.body

  if(!name){
    return res.status(422).json({msg:'O nome tá vazio'})
  }
  //check is game name exist
  const gameExists = await Game.findOne({name:name})

  if (gameExists) {
    return res.status(422).json({msg:'O nome tá vazio'})
  }
  //criar game
  const game = new Game({
    name,
  })

  try{
    await game.save()
    res.status(201).json({msg:'salvo'})
    
  }catch(error){
    res.status(500).json({msg:"error"})
  }
}