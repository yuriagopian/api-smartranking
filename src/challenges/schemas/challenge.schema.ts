import { Prop, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

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
