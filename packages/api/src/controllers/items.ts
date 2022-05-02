import { Request, Response } from "express";
import client from "../../prisma";
import { v2 as cloudinary } from "cloudinary";

export async function getAllItems(req: Request, res: Response) {
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

export async function getSingleItem(req: Request, res: Response) {
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

export async function createItem(req: Request, res: Response) {
  const body = req.body;

  if (!body) {
    res.status(401).json({
      message: "Data is required",
    });
  }

  try {
    const cloudinaryResponse = await cloudinary.uploader.upload(body.image, {
      upload_preset: "ml_default",
    });

    const data = await client.restaurant.create({
      data: {
        name: body.name,
        ownerName: body.ownerName,
        since: body.since,
        location: body.location,
        imageURL: cloudinaryResponse.secure_url,
      },
    });

    if (!data) {
      return res.status(401).json({
        message: "Restaurant creation was unsuccessfull",
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
    const data = await client.restaurant.update({
      data: body,
      where: {
        id: Number(id),
      },
    });

    if (!data) {
      return res.status(401).json({
        message: "Restaurant updation was unsuccessfull",
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
