import { Prisma } from "@prisma/client";
import { Request, Response } from "express";
import { cache } from "..";
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
      const result = await client.user.create({
        data: {
          name: body.name,
          role: "ADMIN",
          uid: body.uid,
        },
      });
      cache.set(`user-${body.uid}`, {
        ...result,
      });
      res.status(201).json({
        result,
      });
    } else {
      res.status(201).json({
        result: data,
      });
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      const currentError = error as Prisma.PrismaClientKnownRequestError;
      if (currentError.code === "P2002") {
        res.status(304).json({
          error: "User already exists",
        });
      } else {
        res.status(401).json({
          error: "Something went wrong",
        });
      }
      res.status(401).json({
        error: "Something went wrong",
      });
    }
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
