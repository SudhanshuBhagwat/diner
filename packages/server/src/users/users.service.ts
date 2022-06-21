import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  create(createUserDto: Prisma.UserCreateManyInput) {
    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  findOne(id: string) {
    return this.prisma.user.findFirst({
      where: {
        uid: id,
      },
    });
  }
}
