import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICategory } from './domains/category.interface';
import { CreateCategoryDto } from './dtos/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category')
    private readonly categoriesModel: Model<ICategory>,
  ) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<ICategory> {
    const { category } = createCategoryDto;

    const foundCategory = await this.categoriesModel.findOne({ category });

    if (foundCategory) {
      throw new ConflictException('');
    }
    return await this.categoriesModel.create(createCategoryDto);
  }

  async listCategories() {}

  async getCategory(id: number): Promise<ICategory> {
    return;
  }

  async deleteCategory(id: number): Promise<void> {}
}
