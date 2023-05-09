import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersModule } from 'src/players/players.module';
import { PlayersService } from 'src/players/players.service';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { categorySchema } from './schemas/category.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Category',
        schema: categorySchema,
      },
    ]),
    PlayersModule,
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
