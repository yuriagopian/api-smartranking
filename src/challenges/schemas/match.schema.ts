import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Player } from 'src/players/schema/players.schema';
import { Result } from '../interfaces/challenge.interface';

@Schema({ timestamps: true, collection: 'matches' })
export class Match {
  @Prop()
  category: string;

  @Prop()
  players: Array<Player>;

  @Prop()
  def: Player;

  @Prop()
  result: Array<Result>;
}

export const matchSchema = SchemaFactory.createForClass(Match);
