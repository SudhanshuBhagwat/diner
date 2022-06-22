import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Request } from 'express';
import { MenusService } from './menus.service';

@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Post()
  create(@Body() createMenuDto: Prisma.MenuCreateInput, @Req() req: Request) {
    const restaurantId = req.query.restaurantId as string;
    return this.menusService.create(createMenuDto, +restaurantId);
  }

  @Get()
  findAll(@Req() req: Request) {
    const restaurantId = req.query.restaurantId as string;
    return this.menusService.findAll(+restaurantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menusService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMenuDto: Prisma.MenuUpdateInput,
  ) {
    return this.menusService.update(+id, updateMenuDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menusService.remove(+id);
  }
}
