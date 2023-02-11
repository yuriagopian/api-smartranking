import { Injectable, Logger } from '@nestjs/common';
import { IPlayer } from './domain/player.interface';
import { CreatePlayerDto } from './dtos/create-player.sto';

@Injectable()
export class PlayersService {
  private readonly logger = new Logger(PlayersService.name);
  private players: IPlayer[] = [];
  createPlayer(createPlayersDto: CreatePlayerDto) {
    this.logger.log(`create player dto: ${createPlayersDto}`);
  }

  private create(createPlayersDto: CreatePlayerDto): IPlayer {}
}
