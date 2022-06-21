import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { MenusModule } from './menus/menus.module';
import { ItemsModule } from './items/items.module';

@Module({
  imports: [UsersModule, RestaurantsModule, MenusModule, ItemsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
