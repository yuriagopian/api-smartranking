import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { runInThisContext } from 'vm';
import { IPlayer } from './domain/player.interface';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { UpdatePlayerDto } from './dtos/update-player.dto';
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  createPlayer(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playersService.createPlayer(createPlayerDto);
  }

  @Patch()
  updatePlayer(@Body() updatePlayerDto: UpdatePlayerDto) {
    return this.playersService.updatePlayer(updatePlayerDto);
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
