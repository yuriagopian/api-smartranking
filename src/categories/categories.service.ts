import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICategory } from './domain/category.interface';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';

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
      throw new ConflictException(
        `Category with id ${category} already registered`,
      );
    }

    const createCategory = new this.categoriesModel(createCategoryDto);

    return await createCategory.save();
  }

  async updateCategory(
    id: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<void> {
    await this.getCategory(id);

    await this.categoriesModel.findOneAndUpdate(
      { category: id },
      updateCategoryDto,
    );
  }

  async assignCategoryToPlayer(
    categoryId: string,
    playerId: string,
  ): Promise<void> {
    await this.getCategory(categoryId);

    // const playerFound = await this.
  }

  async listCategories(): Promise<ICategory[]> {
    return await this.categoriesModel.find();
  }

  async getCategory(id: string): Promise<ICategory> {
    const categoryFound = await this.categoriesModel.findOne({ category: id });

    if (!categoryFound) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return categoryFound;
  }

  async deleteCategory(id: number): Promise<void> {}
}
