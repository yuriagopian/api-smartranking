// import { PartialType } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Allow,
  ValidateIf,
} from 'class-validator';
import {
  IsEmailPassed,
  EmailCanNotBeUpdated,
} from '../validations/email-can-not-be-updated.rule';

// import { CreatePlayerDto } from './create-player.dto';
// export class UpdatePlayerDto extends PartialType(CreatePlayerDto) {}
export class UpdatePlayerDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(9)
  @MaxLength(13)
  readonly phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(256)
  readonly name: string;

  @EmailCanNotBeUpdated({ message: 'The field "email" Cannot be changed' })
  email: string;
}
