import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { RestaurantsService } from './restaurants.service';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Post()
  async create(
    @Body()
    createRestaurantDto: Prisma.RestaurantUncheckedCreateInput & {
      image: any;
    },
    @Res({ passthrough: true }) res: Response,
  ) {
    let data = {};
    try {
      data = await this.restaurantsService.create(createRestaurantDto);
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

  @Get()
  async findAll(@Res({ passthrough: true }) res: Response) {
    let data = {};
    try {
      data = await this.restaurantsService.findAll();
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

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    let data = {};
    try {
      data = await this.restaurantsService.findOne(Number(id));
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

  @Get(':id/menu')
  async getMenusForRestaurant(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    let data;
    try {
      data = await this.restaurantsService.getMenusForRestaurant(Number(id));
      data = data.Menu.map((menu) => {
        return {
          id: menu.id,
          name: menu.name,
          data: menu.Item,
        };
      });

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

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRestaurantDto: Prisma.RestaurantUpdateInput,
    @Res({ passthrough: true }) res: Response,
  ) {
    let data = {};
    try {
      data = await this.restaurantsService.update(+id, updateRestaurantDto);
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

  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    let data = {};
    try {
      data = await this.restaurantsService.remove(+id);
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
}
