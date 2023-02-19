import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
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

  @Prop()
  requester: Player;

  @Prop()
  category: string;

  @Prop()
  players: Array<Player>;

  @Prop()
  matches: Match;
}

export const challengeSchema = SchemaFactory.createForClass(Challenge);
