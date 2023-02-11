import { Controller, Delete, Get, Post } from '@nestjs/common';
import { PlayersService } from './players.service';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  createPlayer() {}

  @Delete()
  removePlayer(id) {}

  @Get()
  listPlayers() {}

  @Get('id')
  getPlayerById(id) {}
}
