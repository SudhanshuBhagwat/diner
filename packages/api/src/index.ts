import express, { Router } from "express";
import type { Express, Request, Response } from "express";
import cors from "cors";
import "dotenv/config";

import restaurantsRouter from "./routes/restaurants";

const PORT: number = parseInt(process.env.PORT) || 3001;
const app: Express = express();

app.use(cors());
app.use(express.json());

const apiRouter = Router();

app.use("/api", apiRouter);

/* Routers section */
apiRouter.use("/restaurants", restaurantsRouter);

/* Default Express Route */
apiRouter.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Hello from New API 🚀",
  });
});

/* Express startup */
app.listen(PORT, () => {
  console.log(`🚀 Server ready at: http://localhost:${PORT}`);
});

export default app;
