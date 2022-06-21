import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}

  create(createItemDto: Prisma.ItemCreateInput) {
    return this.prisma.item.create({
      data: createItemDto,
    });
  }

  findAll() {
    return `This action returns all items`;
  }

  findOne(id: number) {
    return this.prisma.item.findFirst({
      where: {
        id,
      },
    });
  }

  update(id: number, updateItemDto: Prisma.MenuUpdateInput) {
    return this.prisma.item.update({
      where: {
        id,
      },
      data: updateItemDto,
    });
  }

  remove(id: number) {
    return this.prisma.item.delete({
      where: {
        id,
      },
    });
  }
}
