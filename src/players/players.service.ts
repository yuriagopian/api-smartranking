import { Injectable, Logger } from '@nestjs/common';
import { IPlayer } from './domain/player.interface';
import { CreatePlayerDto } from './dtos/create-player.dto';

import { v4 as uuid } from 'uuid';
import { UpdatePlayerDto } from './dtos/update-player.dto';

@Injectable()
export class PlayersService {
  private readonly logger = new Logger(PlayersService.name);
  private players: IPlayer[] = [];

  async listPlayers(): Promise<IPlayer[]> {
    return this.players;
  }

  async createPlayer(createPlayersDto: CreatePlayerDto): Promise<void> {
    this.logger.log(`create player dto: ${createPlayersDto}`);
    await this.create(createPlayersDto);
  }

  async updatePlayer(updatePlayerDto: UpdatePlayerDto): Promise<void> {
    const { email, name } = updatePlayerDto;

    const playerFound = this.players.find((p) => p.email === email);
    if (playerFound) {
      this.update(playerFound, updatePlayerDto);
    }
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

  private update(player, updatePlayerDto: UpdatePlayerDto): void {
    const { name } = updatePlayerDto;

    player.name = name;
  }
}
