import { Request, Response } from "express";
import client from "../../prisma";

export async function createUser(req: Request, res: Response) {
  try {
    const body = req.body;

    if (!body) {
      res.status(401).json({
        message: "Data is required",
      });
    }

    const data = await client.user.findFirst({
      where: {
        uid: body.uid,
      },
    });

    if (!data) {
      await client.user.create({
        data: {
          name: body.name,
          role: "ADMIN",
          uid: body.uid,
        },
      });
    }

    res.status(201);
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
}

export async function getUser(req: Request, res: Response) {
  try {
    const body = req.body;

    if (!body) {
      res.status(401).json({
        message: "Data is required",
      });
    }

    const data = await client.user.findFirst({
      where: {
        uid: body.uid,
      },
    });

    if (!data) {
      res.status(401).json({
        error: "No such user",
      });
    }

    res.status(200);
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
}
