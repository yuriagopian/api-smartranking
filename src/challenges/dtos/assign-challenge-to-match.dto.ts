import { IsNotEmpty } from 'class-validator';
import { Player } from 'src/players/schema/players.schema';
import { Result } from '../interfaces/challenge.interface';

export class AtribuirDesafioPartidaDto {
  @IsNotEmpty()
  def: Player;

  @IsNotEmpty()
  resultado: Array<Result>;
}
