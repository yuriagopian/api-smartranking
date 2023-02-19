import { DesafioStatus } from '../interfaces/desafio-status.enum';
import { IsOptional } from 'class-validator';

export class UpdateChallengeDto {
  @IsOptional()
  dateTimeChallenge: Date;

  @IsOptional()
  status: ChallengeStatus;
}
