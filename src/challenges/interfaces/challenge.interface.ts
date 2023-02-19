import { Document } from 'mongoose';
import { Player } from 'src/players/schema/players.schema';
import { ChallengeStatus } from './challenge-status.enum';

export interface Desafio extends Document {
  datetimeChallenge: Date;
  status: ChallengeStatus;
  datetimeRequest: Date;
  datetimeResponse: Date;
  requester: Player;
  category: string;
  players: Array<Player>;
  matches: Match;
}

export interface Match extends Document {
  category: string;
  players: Array<Player>;
  def: Player;
  result: Array<Result>;
}

export interface Result {
  set: string;
}
