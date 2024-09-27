import mongoose from "mongoose"

const Game = mongoose.model("Game",{
    name: String,
    description: String,
    developer: String,
    publisher: String,
    released_date: String,
    box_img: String,
    game_title_img: String,
    id: String
})

export default Game