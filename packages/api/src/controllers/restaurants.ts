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

export async function getSingleRestaurant(req: Request, res: Response) {
  const id = req.params.id;
  if (!id) {
    res.status(401).json({
      message: "ID is required",
    });
  }

  try {
    const data = await client.restaurant.findUnique({
      where: {
        id: Number(id),
      },
    });
    return res.status(200).json({
      results: data || [],
    });
  } catch (error) {
    return res.status(401).json({
      error: error.message,
    });
  }
}

export async function createRestaurant(req: Request, res: Response) {
  const body = req.body;
  console.log(body);

  if (!body) {
    res.status(401).json({
      message: "Data is required",
    });
  }

  try {
    const data = await client.restaurant.create({
      data: body,
    });

    if (!data) {
      return res.status(401).json({
        message: "Restaurant creation was unsuccessfull",
      });
    }

    return res.status(201).json({
      results: data,
    });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
}

export async function deleteRestaurant(req: Request, res: Response) {
  const id = req.params.id;
  if (!id) {
    res.status(401).json({
      message: "ID is required",
    });
  }

  try {
    const data = await client.restaurant.delete({
      where: {
        id: Number(id),
      },
    });
    return res.status(204).json({
      results: data,
    });
  } catch (error) {
    return res.status(401).json({
      error: error.message,
    });
  }
}
