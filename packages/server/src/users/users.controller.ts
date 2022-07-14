import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Body() createUserDto: Prisma.UserCreateInput,
    @Res() res: Response,
  ) {
    let data = {};
    try {
      data = await this.usersService.create(createUserDto);
      if (data) {
        res.status(HttpStatus.CREATED);
      } else {
        res.status(HttpStatus.NOT_MODIFIED);
      }
    } catch (error) {
      console.error(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return data;
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    let data = {};
    try {
      data = await this.usersService.findOne(+id);
      if (data) {
        res.status(HttpStatus.OK);
      } else {
        res.status(HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      console.error(error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return data;
  }
}
