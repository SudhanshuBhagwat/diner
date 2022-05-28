import express, { NextFunction, Router } from "express";
import type { Express, Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import { v2 as cloudinary } from "cloudinary";
import NodeCache from "node-cache";

import {
  restaurantsRouter,
  menusRouter,
  itemsRouter,
  usersRouter,
} from "./routes";

const PORT: number = parseInt(process.env.PORT) || 3001;
const app: Express = express();
export const cache = new NodeCache({
  stdTTL: 300,
});

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

cloudinary.config({
  cloud_name: "dn1hiejh8",
  api_key: "789155866719392",
  api_secret: "DMnd4nll_CTi3KxGKIYY-OrQJDs",
});

async function checkUserCache(req: Request, res: Response, next: NextFunction) {
  try {
    const body = req.body;

    if (!body) {
      res.status(401).json({
        message: "Data is required",
      });
    }
    const key = `user-${body.uid}`;
    if (!cache.has(key)) {
      next();
    } else {
      const data: any = cache.get(key);
      res.status(301).json({
        ...data,
      });
    }
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
}

const apiRouter = Router();

app.use("/api", apiRouter);

/* Routers section */
apiRouter.use("/restaurants", restaurantsRouter);
apiRouter.use("/menus", menusRouter);
apiRouter.use("/items", itemsRouter);
apiRouter.use(checkUserCache).use("/users", usersRouter);

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
