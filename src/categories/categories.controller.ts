import { Body, Controller } from '@nestjs/common';
import { CreateCategoryDto } from './dtos/create-category.dto';

@Controller('api/v1/categories')
export class CategoriesController {
  constructor(private readonly categoriesService) {}

  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {}
}
