import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class ItemsService {
  constructor(private prisma: PrismaService) {}

  async create(
    createItemDto: Prisma.ItemCreateInput & {
      image: any;
    },
    menuId: number,
  ) {
    const { secure_url } = await cloudinary.uploader.upload(
      createItemDto.image,
      {
        upload_preset: 'ml_default',
      },
    );

    return this.prisma.item.create({
      data: {
        ...createItemDto,
        imageUrl: secure_url,
        menu: {
          connect: {
            id: menuId,
          },
        },
      },
    });
  }

  findAll(menuId: number) {
    return this.prisma.item.findMany({
      where: {
        menuId,
      },
    });
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
