import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Player } from 'src/players/schema/players.schema';
import { Result } from '../interfaces/challenge.interface';

export type MatchDocument = HydratedDocument<Match>;
@Schema({ timestamps: true, collection: 'matches' })
export class Match {
  @Prop()
  category: string;

  // @Prop()
  // players: Array<Player>;

  // @Prop()
  // def: Player;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Player.name }],
  })
  players: mongoose.Types.ObjectId[];

  @Prop({
    type: { type: mongoose.Schema.Types.ObjectId, ref: Player.name },
  })
  def: mongoose.Types.ObjectId[];

  @Prop()
  result: Array<Result>;
}

export const matchSchema = SchemaFactory.createForClass(Match);
