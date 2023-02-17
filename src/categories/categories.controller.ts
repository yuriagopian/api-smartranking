import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ICategory } from './domains/category.interface';
import { CreateCategoryDto } from './dtos/create-category.dto';

@Controller('api/v1/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<ICategory> {
    return await this.categoriesService.createCategory(createCategoryDto);
  }

  @Get()
  async listCategories(): Promise<ICategory[]> {
    return this.categoriesService.listCategories();
  }

  @Get('id')
  async getCategory(@Param('id') id: string): Promise<ICategory> {
    return this.categoriesService.getCategory(id);
  }
}
