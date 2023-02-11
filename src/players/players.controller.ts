import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { runInThisContext } from 'vm';
import { IPlayer } from './domain/player.interface';
import { CreatePlayerDto } from './dtos/create-player.sto';
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  createPlayer(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.createPlayer(createPlayerDto);
  }

  @Delete()
  removePlayer(id) {}

  @Get()
  listPlayers(): Promise<IPlayer[]> {
    return this.playersService.listPlayers();
  }

  @Get('id')
  getPlayerById(id) {}
}
