import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { IPlayer } from './domain/player.interface';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { UpdatePlayerDto } from './dtos/update-player.dto';
import { PlayersService } from './players.service';
import { PlayersValidationParamsPipe } from './pipes/players-validation-params.pipe';

@Controller('api/v1/players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  async createPlayer(@Body() createPlayerDto: CreatePlayerDto) {
    return await this.playersService.createPlayer(createPlayerDto);
  }

  @Patch()
  updatePlayer(@Body() updatePlayerDto: UpdatePlayerDto) {
    return this.playersService.updatePlayer(updatePlayerDto);
  }

  @Delete(':email')
  removePlayer(@Param('email', PlayersValidationParamsPipe) email: string) {
    return this.playersService.deletePlayer(email);
  }

  @Get()
  listPlayers(): Promise<IPlayer[]> {
    return this.playersService.listPlayers();
  }

  @Get('/:email')
  getPlayerById(@Param('email') email: string) {
    return this.playersService.getPlayerByEmail(email);
  }

  @Get('/:_id')
  getPlayerByEmail(@Param('_id') id: string) {
    return this.playersService.getPlayerByEmail(id);
  }
  // @Get(':email')
  // getPlayerByEmail(@Param('email') email: string) {
  //   return this.playersService.getPlayerByEmail(email);
  // }

  // @Get()
  // getPlayers(@Query('email') email: string): Promise<IPlayer[] | IPlayer> {
  //   if (email) {
  //     return this.playersService.getPlayerByEmail(email);
  //   } else {
  //     return this.playersService.listPlayers();
  //   }
  // }
}
