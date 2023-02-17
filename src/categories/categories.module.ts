import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
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
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
