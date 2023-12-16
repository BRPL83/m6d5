import mongoose, { Schema } from "mongoose"

const BlogPostSchema = new Schema({
    category: {
        type: String,
        required: true,
    },

    title: {
        type: String,
        required: true,
    },
    cover: {
        type: String,
        required: true,
    },
    readTime: {
        value: Number,
        unit: String,
    },
    author: {
        type: Schema.Types.ObjectId,
        // type: [Schema.Types.ObjectId], // se multipli
        ref: "authors",
    },
    content: {
        type: String,
        required: true,
    },
})

export const BlogPost = mongoose.model("blogposts", BlogPostSchema)