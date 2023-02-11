import { Injectable, Logger } from '@nestjs/common';
import { IPlayer } from './domain/player.interface';
import { CreatePlayerDto } from './dtos/create-player.sto';

import { v4 as uuid } from 'uuid';

@Injectable()
export class PlayersService {
  private readonly logger = new Logger(PlayersService.name);
  private players: IPlayer[] = [];

  async createPlayer(createPlayersDto: CreatePlayerDto): Promise<void> {
    this.logger.log(`create player dto: ${createPlayersDto}`);
    await this.create(createPlayersDto);
  }

  private create(createPlayersDto: CreatePlayerDto): void {
    const { email, name, phoneNumber } = createPlayersDto;

    const player: IPlayer = {
      _id: uuid(),
      name,
      phoneNumber,
      email,
      ranking: 'A',
      position: 1,
      imageUrl: 'http://foto.com/images/foto.jpg',
    };

    this.players.push(player);
  }
}
