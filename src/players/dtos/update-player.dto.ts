// import { PartialType } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
} from 'class-validator';
import { CreatePlayerDto } from './create-player.dto';

// export class UpdatePlayerDto extends PartialType(CreatePlayerDto) {}
export class UpdatePlayerDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(13)
  readonly phoneNumber: string;

  @IsEmail(undefined)
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(256)
  readonly name: string;
}
