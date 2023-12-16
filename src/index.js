import express from "express"
import mongoose from "mongoose"
import apiRouter from "./routers/index.js"
import genericErrorHandler from "./middleware/genericErrorHandler.js"
import cors from "cors"

const port = process.env.PORT || 3030
const app = express()

app.use(express.json())
app.use(cors())

app.get("/health", function (req, res) {
    res.status(200).send()
})

app.use("/api", apiRouter)

app.use(genericErrorHandler)

// Connect to MongoDB with Mongoose.
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Connected to MongoDB")

    app.listen(port, () => {
        console.log("🚀 Server started at " + port)
    })
})