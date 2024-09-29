import mongoose from "mongoose"

const Visuals = new mongoose.Schema({
    url: String,
  });

const Character = mongoose.model("Character",{
    name: String,
    description:String,
    Age: String,
    gender: String,
    race: String,
    id: String,
    visuals: [String]
})

export default Character