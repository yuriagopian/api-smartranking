import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
  UsePipes,
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
  async createPlayer(
    @Body() createPlayerDto: CreatePlayerDto,
  ): Promise<IPlayer> {
    return await this.playersService.createPlayer(createPlayerDto);
  }

  // @Patch()
  // updatePlayer(@Body() updatePlayerDto: UpdatePlayerDto) {
  //   return this.playersService.updatePlayer(updatePlayerDto);
  // }

  @Patch(':id')
  // @UsePipes(ParseUUIDPipe)
  updatePlayer(
    @Param('id', PlayersValidationParamsPipe) id: string,
    @Body() updatePlayerDto: UpdatePlayerDto,
  ): Promise<void> {
    return this.playersService.updatePlayer(id, updatePlayerDto);
  }

  @Delete(':email')
  removePlayer(@Param('email', PlayersValidationParamsPipe) email: string) {
    return this.playersService.deletePlayer(email);
  }
  @Delete(':id')
  removePlayerById(@Param('id', PlayersValidationParamsPipe) id: string) {
    return this.playersService.deletePlayerById(id);
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
    return this.playersService.getPlayerById(id);
  }

  // @Get()
  // getPlayers(@Query('email') email: string): Promise<IPlayer[] | IPlayer> {
  //   if (email) {
  //     return this.playersService.getPlayerByEmail(email);
  //   } else {
  //     return this.playersService.listPlayers();
  //   }
  // }
}
