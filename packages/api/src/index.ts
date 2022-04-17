import express from "express";
import type { Express, Request, Response } from "express";
import cors from "cors";

const PORT: number = parseInt(process.env.PORT) || 3001;
const app: Express = express();

app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Hello from New API",
  });
});

app.listen(PORT, () => {
  console.log(`Listening on PORT: ${PORT}`);
});
