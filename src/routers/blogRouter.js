import express from "express"
import { BlogPost } from "../models/blogPost.js"

const blogPostRouter = express.Router()

blogPostRouter
    .get("/", async function (req, res, next) {
        const results = await BlogPost.find({}).populate(
            "author",
            "-_id firstName lastName"
        )
        res.json(results)
    })
    .get("/:id", async function (req, res, next) {
        try {
            const blogPost = await BlogPost.findById(req.params.id)

            if (!blogPost) {
                return res.status(404).send()
            }

            res.json(blogPost)
        } catch (err) {
            next(err)
        }
    })
    .post("/", async function (req, res, next) {
        const newBlogPost = await BlogPost.create(req.body)
        res.json(newBlogPost)
    })
    .put("/:id", async function (req, res, next) {
        const updatedBlogPost = await BlogPost.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        res.json(updatedBlogPost)
    })
    .delete("/:id", async function (req, res, next) {
        const deletedBlogPost = await BlogPost.findByIdAndDelete(req.params.id)
        res.status(!deletedBlogPost ? 404 : 204).send()
    })

export default blogPostRouter