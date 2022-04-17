import { Request, Response } from "express";
import client from "../../prisma";

export async function getAllRestaurants(req: Request, res: Response) {
  try {
    const data = await client.restaurant.findMany();
    res.status(200).json({
      results: data,
    });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
}
