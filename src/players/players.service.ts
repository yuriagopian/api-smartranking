import {
  ConflictException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { IPlayer } from './domain/player.interface';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { v4 as uuid } from 'uuid';
import { UpdatePlayerDto } from './dtos/update-player.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PlayersService {
  private readonly logger = new Logger(PlayersService.name);

  constructor(
    @InjectModel('Player')
    private readonly playersModel: Model<IPlayer>,
  ) {}

  async listPlayers(): Promise<IPlayer[]> {
    return this.playersModel.find();
  }

  async getPlayerByEmail(email: string): Promise<IPlayer> {
    const player = this.playersModel.findOne({ email });

    if (!player) {
      throw new NotFoundException(`Player with email ${email} not fount`);
    }

    return player;
  }

  async getPlayerById(id: string): Promise<IPlayer> {
    const player = this.playersModel.findOne({ _id: id });

    if (!player) {
      throw new NotFoundException(`Player with id ${id} not fount`);
    }

    return player;
  }

  async createPlayer(createPlayersDto: CreatePlayerDto): Promise<void> {
    const { email } = createPlayersDto;
    this.logger.log(`create player dto: ${createPlayersDto}`);
    const playerFound = await this.playersModel.findOne({ email });
    if (playerFound) {
      throw new ConflictException(
        `The User With email ${email} already exists`,
      );
    }
    this.create(createPlayersDto);
  }

  // async updatePlayer(id, updatePlayerDto: UpdatePlayerDto): Promise<void> {
  //   const { email } = updatePlayerDto;
  //   const playerFound = await this.getPlayerByEmail(email);
  //   if (playerFound) {
  //     await this.playersModel.findOneAndUpdate({ email }, updatePlayerDto);
  //   }
  // }

  async updatePlayer(id, updatePlayerDto: UpdatePlayerDto): Promise<void> {
    const playerFound = await this.playersModel.findOne({ _id: id });
    if (playerFound) {
      await this.playersModel.findOneAndUpdate({ _id: id }, updatePlayerDto);
    }
  }

  async deletePlayer(email: string): Promise<void> {
    const player = await this.getPlayerByEmail(email);
    if (!player) {
      throw new NotFoundException(`Player with email ${email} not found`);
    }

    await this.playersModel.deleteOne({ email });
  }

  private async create(createPlayersDto: CreatePlayerDto): Promise<IPlayer> {
    const playerCreated = new this.playersModel(createPlayersDto);
    return await playerCreated.save();
    const { email, name, phoneNumber } = createPlayersDto;

    const player = {
      name,
      phoneNumber,
      email,
      ranking: 'A',
      position: 1,
      imageUrl: 'http://foto.com/images/foto.jpg',
    };

    this.playersModel.create(player);
  }
}
