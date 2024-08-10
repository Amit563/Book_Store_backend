import express from "express";
import dotenv from "dotenv";
import { database } from "./db/database.js";
import cors from "cors";
import bookRoute from "./route/bookRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Middleware for parsing request body
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use("/books", bookRoute);

database();

app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
});
