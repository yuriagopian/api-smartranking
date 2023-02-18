import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Schema, Types } from 'mongoose';
import { PlayersService } from 'src/players/players.service';
import { ICategory } from './domain/category.interface';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { CategoryDocument, Category } from './schemas/category.schema';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel('Category')
    private readonly categoriesModel: Model<CategoryDocument>,
    private readonly playersService: PlayersService,
  ) {}

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    const { category } = createCategoryDto;

    const foundCategory = await this.categoriesModel.findOne({ category });

    if (foundCategory) {
      throw new ConflictException(
        `Category with id ${category} already registered`,
      );
    }

    const createCategory = await this.categoriesModel.create(createCategoryDto);
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
    const categoryFound = await this.categoriesModel
      .findOne({
        category: categoryId,
      })
      .exec();

    categoryFound.players.push(new Schema.Types.ObjectId(playerId));

    // const playerFound = await this.
  }

  async listCategories(): Promise<Category[]> {
    return await this.categoriesModel
      .find()
      .populate([{ path: 'players', model: 'player' }])
      .exec();
  }

  async getCategory(id: string): Promise<Category> {
    const categoryFound = await this.categoriesModel.findOne({ category: id });

    if (!categoryFound) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return categoryFound;
  }

  async deleteCategory(id: number): Promise<void> {}
}
