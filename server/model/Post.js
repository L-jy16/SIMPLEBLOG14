const mongoose = require("mongoose");

//timestamps: true 추가하면 createdAt이 추가되는데 이게 시간을 나타냄

const postSchema = new mongoose.Schema(
    {
        title: String,
        content: String,
        postNum: Number,
        image: String,
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        repleNum: {
            type: Number,
            default: 0,
        }
    },
    { collection: "posts", timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

module.exports = { Post };