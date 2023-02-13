import { Injectable, Logger, NotFoundException } from '@nestjs/common';
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
  async getPlayerByEmail(email: string): Promise<IPlayer> {
    const player = this.players.find((player) => player.email === email);

    if (!player) {
      throw new NotFoundException(`Player tiwh email ${email} not fount`);
    }

    return player;
  }

  async createPlayer(createPlayersDto: CreatePlayerDto): Promise<void> {
    this.logger.log(`create player dto: ${createPlayersDto}`);
    this.create(createPlayersDto);
  }

  async updatePlayer(updatePlayerDto: UpdatePlayerDto): Promise<void> {
    const { email, name } = updatePlayerDto;

    const playerFound = this.players.find((p) => p.email === email);
    if (playerFound) {
      this.update(playerFound, updatePlayerDto);
    }
  }

  async deletePlayer(email: string): Promise<void> {
    const player = this.players.find((player) => player.email === email);

    this.players = this.players.filter((p) => p.email !== email);
  }
  // mongodb+srv://dev:8zmeMI1Rj1UfmWWQ@cluster0.mnc4s.mongodb.net/test

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
