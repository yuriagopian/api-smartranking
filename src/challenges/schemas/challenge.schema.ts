import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Player } from 'src/players/schema/players.schema';
import { Match } from './match.schema';

export type ChallengeDocument = HydratedDocument<Challenge>;

@Schema({ timestamps: true, collection: 'challenges' })
export class Challenge {
  @Prop()
  dateTimeChallenge: Date;

  @Prop()
  status: string;

  @Prop()
  dateTimeRequest: Date;

  @Prop()
  dateTimeResponse: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Player.name })
  requester: mongoose.Types.ObjectId;

  @Prop()
  category: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: Player.name }],
  })
  players: mongoose.Types.ObjectId[];

  // @Prop()
  // players: Array<Player>;

  // @Prop()
  // matches: Match;

  @Prop({
    type: { type: mongoose.Schema.Types.ObjectId, ref: Match.name },
  })
  match: mongoose.Types.ObjectId;
}

export const challengeSchema = SchemaFactory.createForClass(Challenge);
