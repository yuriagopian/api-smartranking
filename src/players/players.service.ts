import { Injectable, Logger } from '@nestjs/common';
import { IPlayer } from './domain/player.interface';
import { CreatePlayerDto } from './dtos/create-player.sto';

import { v4 as uuid } from 'uuid';

@Injectable()
export class PlayersService {
  private readonly logger = new Logger(PlayersService.name);
  private players: IPlayer[] = [];
  createPlayer(createPlayersDto: CreatePlayerDto): Promise<void> {
    this.logger.log(`create player dto: ${createPlayersDto}`);
  }

  private create(createPlayersDto: CreatePlayerDto): IPlayer {
    const { email, name, phoneNumber } = createPlayersDto;

    const player: IPlayer = {
      _id: uuid(),
      name,
      phoneNumber,
      email,
    };
    return player;
  }
}
