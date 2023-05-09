import { IsNotEmpty } from 'class-validator';
import { Player, PlayerDocument } from 'src/players/schema/players.schema';
import { Result } from '../interfaces/challenge.interface';

export class AssignChallengeToMatchDto {
  @IsNotEmpty()
  def: PlayerDocument;

  @IsNotEmpty()
  result: Array<Result>;
}
