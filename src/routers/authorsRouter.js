import express from "express"
import { Author } from "../models/authors.js"

const authorsRouter = express.Router()

authorsRouter
    .get("/", async function (req, res, next) {
        const results = await Author.find({})
        res.json(results)
    })
    .get("/:id", async function (req, res, next) {
        try {
            const author = await Author.findById(req.params.id)

            if (!author) {
                return res.status(404).send()
            }

            res.json(author)
        } catch (err) {
            next(err)
        }
    })
    .post("/", async function (req, res, next) {
        const newAuthor = await Author.create(req.body)
        res.json(newAuthor)
    })
    .put("/:id", async function (req, res, next) {
        const updatedAuthor = await Author.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        res.json(updatedAuthor)
    })
    .delete("/:id", async function (req, res, next) {
        const deletedAuthor = await Author.findByIdAndDelete(req.params.id)
        res.status(!deletedAuthor ? 404 : 204).send()
    })

export default authorsRouter