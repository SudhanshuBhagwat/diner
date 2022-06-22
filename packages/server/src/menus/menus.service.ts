import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MenusService {
  constructor(private prisma: PrismaService) {}

  async create(createMenuDto: Prisma.MenuCreateInput, restaurantId: number) {
    return this.prisma.menu.create({
      data: {
        name: createMenuDto.name,
        restaurant: {
          connect: {
            id: restaurantId,
          },
        },
      },
    });
  }

  findAll(restaurantId: number) {
    return this.prisma.menu.findMany({
      where: {
        restaurantId,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.menu.findFirst({
      where: {
        id,
      },
    });
  }

  update(id: number, updateMenuDto: Prisma.MenuUpdateInput) {
    return this.prisma.menu.update({
      where: {
        id,
      },
      data: updateMenuDto,
    });
  }

  remove(id: number) {
    return this.prisma.menu.delete({
      where: {
        id,
      },
    });
  }
}
