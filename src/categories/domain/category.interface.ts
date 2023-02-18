import { IPlayer } from 'src/players/domain/player.interface';

export interface ICategory extends Document {
  readonly category: string;
  description: string;
  events: Array<CategoryEvent>;
  players: Array<IPlayer>;
}

export interface CategoryEvent {
  name: string;
  operation: string;
  value: number;
}
