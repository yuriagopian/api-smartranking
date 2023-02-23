import { IsNotEmpty } from 'class-validator';
import { Player } from 'src/players/schema/players.schema';
import { Result } from '../interfaces/challenge.interface';

export class AssignChallengeToMatchDto {
  @IsNotEmpty()
  def: Player;

  @IsNotEmpty()
  result: Array<Result>;
}
