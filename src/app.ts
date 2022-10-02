import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config()
const app = express();
app.use(cors());
app.use(express.urlencoded({
  extended:true
}));
app.use(express.json());
app.get('/', (req: Request, res: Response) => {
  res.json({
    "nome": "Henrique",
    "idade": 22
  })
})
app.listen(process.env.PORT, () => {

  console.log(`Server was started on http://localhost:${process.env.PORT}`);
}
);