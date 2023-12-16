import express from "express"
import endpoints from "express-list-endpoints"
import mongoose from "mongoose"
import { authorRoute } from "./services/authors/index.js"
import { blogRoute } from "./services/blogs/index.js"
import {
  badRequestHandler,
  genericErrorHandler,
  notfoundHandler,
  unauthorizedHandler,
} from "./errorHandlers.js"
const app = express();
const PORT = process.env.PORT || 3030

app.use(express.json());

app.use("/authors", authorRoute);
app.use("/blogs", blogRoute);

//Error handlers
app.use(badRequestHandler) // 400
app.use(unauthorizedHandler) // 401
app.use(notfoundHandler) // 404
app.use(genericErrorHandler) // 500 (this should ALWAYS be the last one)

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    console.log('Successfully connected to MongoDB.');

    app.listen(PORT, () => {
      console.log(
        `Server is running on port ${PORT}! \ Avaible endopoints: \n`
      );  
      console.table(endpoints(app));
    });
  } catch (error) {
    console.log('CONNECTION FAILED! Error: ', error);
  }
};

startServer();
