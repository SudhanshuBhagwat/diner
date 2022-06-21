import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RestaurantsService {
  constructor(private prisma: PrismaService) {}

  create(createRestaurantDto: Prisma.RestaurantCreateInput) {
    return this.prisma.restaurant.create({
      data: createRestaurantDto,
    });
  }

  findOne(id: number) {
    return this.prisma.restaurant.findFirst({
      where: {
        id,
      },
    });
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
