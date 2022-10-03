import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import RoutesUser from "./routes/RoutesUser";

dotenv.config()
const { PORT, MONGODB_USER, MONGODB_PASSWORD } = process.env;
const MONGODB_URI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD
  ? encodeURIComponent(MONGODB_PASSWORD)
  : MONGODB_PASSWORD}@hacket.sctdcfi.mongodb.net/?retryWrites=true&w=majority`;
const app = express();
app.use(cors());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());
// Rotas
app.use("/user", RoutesUser);
mongoose.connect(MONGODB_URI).then(() => {

  console.log("Mongo db conectado");
  app.listen(PORT);
}).catch(err => console.error(err));