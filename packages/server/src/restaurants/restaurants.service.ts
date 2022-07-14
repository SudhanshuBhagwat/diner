import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class RestaurantsService {
  constructor(private prisma: PrismaService) {}

  async create(
    createRestaurantDto: Prisma.RestaurantUncheckedCreateInput & {
      image: any;
    },
  ) {
    const { secure_url } = await cloudinary.uploader.upload(
      createRestaurantDto.image,
      {
        upload_preset: 'ml_default',
      },
    );

    return this.prisma.restaurant.create({
      data: {
        name: createRestaurantDto.name,
        ownerName: createRestaurantDto.ownerName,
        since: createRestaurantDto.since,
        location: createRestaurantDto.location,
        userId: createRestaurantDto.userId,
        imageUrl: secure_url,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.restaurant.findFirst({
      where: {
        id,
      },
    });
  }

  getMenusForRestaurant(id: number) {
    return this.prisma.restaurant.findFirst({
      where: {
        id,
      },
      select: {
        Menu: {
          select: {
            id: true,
            name: true,
            Item: {
              select: {
                id: true,
                imageUrl: true,
                name: true,
                price: true,
                veg: true,
              },
            },
          },
        },
      },
    });
  }

  findAll() {
    return this.prisma.restaurant.findMany();
  }

  update(id: number, updateRestaurantDto: Prisma.RestaurantUpdateInput) {
    return this.prisma.restaurant.update({
      where: {
        id,
      },
      data: updateRestaurantDto,
    });
  }

  remove(id: number) {
    return this.prisma.restaurant.delete({
      where: {
        id,
      },
    });
  }
}
