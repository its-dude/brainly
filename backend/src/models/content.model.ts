import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({
    title: String,

    type: {
        type: String,
        require: true,
        enum: ["document", "text", "link", "twitter", "youtube"]
    },

    link: String,

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        require: "true"
    },

    tags:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
        default:[]
    }]

})

const tagSchema = new mongoose.Schema({
    title: String,
})
const Tag = mongoose.model("Tag",tagSchema);

const Content = mongoose.model("Content", contentSchema);

export default Content;
export {Tag};