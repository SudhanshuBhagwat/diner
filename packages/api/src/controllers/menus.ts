import { Request, Response } from "express";
import client from "../../prisma";

export async function getAllMenus(req: Request, res: Response) {
  try {
    const restaurantId = req.query.restaurantId;

    const data = await client.menu.findMany({
      where: {
        restaurantId: Number(restaurantId),
      },
      select: {
        Item: true,
        id: true,
        name: true,
        restaurantId: true,
      },
    });
    res.status(200).json({
      results: data,
    });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
}

export async function getSingleMenu(req: Request, res: Response) {
  const id = req.params.id;
  if (!id) {
    res.status(401).json({
      message: "ID is required",
    });
  }

  try {
    const data = await client.menu.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        Item: true,
        id: true,
        name: true,
        restaurantId: true,
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

export async function createMenu(req: Request, res: Response) {
  const body = req.body;

  if (!body) {
    res.status(401).json({
      message: "Data is required",
    });
  }

  try {
    const restaurantId = req.query.restaurantId;

    const data = await client.menu.create({
      data: {
        name: body.name,
        restaurant: {
          connect: {
            id: Number(restaurantId),
          },
        },
      },
    });

    if (!data) {
      return res.status(401).json({
        message: "Menu creation was unsuccessfull",
      });
    }

    return res.status(201).json({
      results: "",
    });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
}

export async function editMenu(req: Request, res: Response) {
  const id = req.params.id;
  const body = req.body;

  if (!body) {
    res.status(401).json({
      message: "Data is required",
    });
  }

  try {
    const data = await client.menu.update({
      data: body,
      where: {
        id: Number(id),
      },
    });

    if (!data) {
      return res.status(401).json({
        message: "Menu updation was unsuccessfull",
      });
    }

    return res.status(200).json({
      results: data,
    });
  } catch (error) {
    res.status(401).json({
      error: error.message,
    });
  }
}

export async function deleteMenu(req: Request, res: Response) {
  const id = req.params.id;
  if (!id) {
    res.status(401).json({
      message: "ID is required",
    });
  }

  try {
    const data = await client.menu.delete({
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
