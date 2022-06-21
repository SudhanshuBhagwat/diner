import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MenusService {
  constructor(private prisma: PrismaService) {}

  create(createMenuDto: Prisma.MenuCreateInput) {
    return this.prisma.menu.create({
      data: createMenuDto,
    });
  }

  findAll() {
    return `This action returns all menus`;
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
