import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from 'class-validator';
import { CategoryEvent } from '../domains/category.interface';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  readonly category: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  @ArrayMinSize(1)
  events: Array<CategoryEvent>;
}
