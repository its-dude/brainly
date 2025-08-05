import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
     type: String,
     hash: {
      type: String,
      require: true,
      unique: true,
     },
     userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
     }
})

const Link = mongoose.model("Link",linkSchema);

export default Link;