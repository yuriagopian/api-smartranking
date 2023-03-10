import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { ICategory } from './domain/category.interface';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { Category } from './schemas/category.schema';

@Controller('api/v1/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return await this.categoriesService.createCategory(createCategoryDto);
  }

  @Patch(':id')
  async updateCategory(
    @Param() id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<void> {
    return this.categoriesService.updateCategory(id, updateCategoryDto);
  }

  @Get()
  async listCategories(): Promise<Category[]> {
    return this.categoriesService.listCategories();
  }

  @Get(':id')
  async getCategory(@Param('id') id: string): Promise<Category> {
    return this.categoriesService.getCategory(id);
  }

  @Post(':categoryId/player/:playerId')
  async assignCategoryToPlayer(
    @Param('categoryId') categoryId: string,
    @Param('playerId') playerId: string,
  ) {
    return await this.categoriesService.assignCategoryToPlayer(
      categoryId,
      playerId,
    );
  }
}
