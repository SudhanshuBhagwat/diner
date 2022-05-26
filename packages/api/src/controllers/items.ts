import { Request, Response } from "express";
import client from "../../prisma";
import { v2 as cloudinary } from "cloudinary";

export async function getAllItems(req: Request, res: Response) {
  try {
    const menuId = req.query.menuId;

    const data = await client.item.findMany({
      where: {
        menuId: Number(menuId),
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

export async function getSingleItem(req: Request, res: Response) {
  const id = req.params.id;
  if (!id) {
    res.status(401).json({
      message: "ID is required",
    });
  }

  try {
    const data = await client.item.findUnique({
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

export async function createItem(req: Request, res: Response) {
  const body = req.body;

  if (!body) {
    res.status(401).json({
      message: "Data is required",
    });
  }

  try {
    const menuId = req.query.menuId;
    const cloudinaryResponse = await cloudinary.uploader.upload(body.image, {
      upload_preset: "ml_default",
    });

    const data = await client.item.create({
      data: {
        name: body.name,
        price: Number(body.price),
        veg: Boolean(body.isVeg),
        imageUrl: cloudinaryResponse.secure_url,
        menuId: Number(menuId),
      },
    });

    if (!data) {
      return res.status(401).json({
        message: "Item creation was unsuccessfull",
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

export async function editItem(req: Request, res: Response) {
  const id = req.params.id;
  const body = req.body;

  if (!body) {
    res.status(401).json({
      message: "Data is required",
    });
  }

  try {
    const data = await client.item.update({
      data: body,
      where: {
        id: Number(id),
      },
    });

    if (!data) {
      return res.status(401).json({
        message: "Item updation was unsuccessfull",
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

export async function deleteItem(req: Request, res: Response) {
  const id = req.params.id;
  if (!id) {
    res.status(401).json({
      message: "ID is required",
    });
  }

  try {
    const data = await client.item.delete({
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
