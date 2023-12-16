import express from "express"
import authorsRouter from "./authorsRouter.js"
import blogPostRouter from "./blogRouter.js"
import path from "path"
import multer from "multer"
import { CloudinaryStorage } from "multer-storage-cloudinary"
import { v2 as cloudinary } from "cloudinary"

// yivegoj751@mcenb.com
// Epic0de!

// const diskStorage = multer.diskStorage({
//     destination: "./src/uploads/",
//     filename: function (req, file, callback) {
//         // if (["image/jpeg", "image/png"].includes(file.mimetype)) {
//         callback(null, `${Date.now()}_${file.originalname}`)
//         // } else {
//         //     const error = new Error("Please upload png or jpg")
//         //     error.statusCode = 400
//         //     callback(error)
//         // }
//     },
// })

const cloudinaryStorage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "epicode-folder-test",
    },
})

const upload = multer({ storage: cloudinaryStorage })

const apiRouter = express.Router()

apiRouter.use("/authors", authorsRouter)
apiRouter.use("/blogPosts", blogPostRouter)

apiRouter.patch("/multipart", upload.single("avatar"), (req, res, next) => {
    // qui dentro avremo bisogno di salvare il percorso del file dentro al nostro
    // database, in modo da poter recuperare il nostro file quando ne avremo bisogno

    // req.file contiene le informazioni del file caricato
    console.log(req.file.path)
    res.send({ url: req.file.path })
})

// apiRouter.get("/download/:filename", (req, res, next) => {
//     res.send(path.resolve("./src/uploads/" + req.params.filename))
// })

export default apiRouter