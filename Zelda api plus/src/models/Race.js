import mongoose from "mongoose"

const Race = mongoose.model("Race",{
    name: String,
    description: String,
    habitat: String,
    characteristics:String,
    members:String,
    imgs:[String],
    id: String
})

export default Race