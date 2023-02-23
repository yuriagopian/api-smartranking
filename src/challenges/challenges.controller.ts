import {
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Get,
  Query,
  Put,
  Param,
  Delete,
  Logger,
} from '@nestjs/common';
import { AssignChallengeToMatchDto } from './dtos/assign-challenge-to-match.dto';
import { CreateChallengeDto } from './dtos/create-challenge.dto';
import { UpdateChallengeDto } from './dtos/update-challenge.dto';
import { ChallengeStatusValidationPipe } from './pipes/challenge-status-validation.pipe';
import { Challenge } from './schemas/challenge.schema';

@Controller('api/v1/challenges')
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  private readonly logger = new Logger(ChallengesController.name);

  @Post()
  @UsePipes(ValidationPipe)
  async createChallenge(
    @Body() createChallengeDto: CreateChallengeDto,
  ): Promise<Challenge> {
    this.logger.log(
      `createChallengeDto: ${JSON.stringify(createChallengeDto)}`,
    );
    return await this.challengesService.createChallenge(createChallengeDto);
  }

  @Get()
  async listChallenges(
    @Query('playerId') _id: string,
  ): Promise<Array<Challenge>> {
    return _id
      ? await this.challengesService.getChallengeByPlayerId(_id)
      : await this.challengesService.listChallenges();
  }

  @Put('/:id')
  async updateChallenge(
    @Body(ChallengeStatusValidationPipe)
    updateChallengeDto: UpdateChallengeDto,
    @Param('id') _id: string,
  ): Promise<void> {
    await this.challengesService.updateChallenge(_id, updateChallengeDto);
  }

  @Post('/:id/match/')
  async assignChallengeToMatch(
    @Body(ValidationPipe) assignChallengeToMatchDto: AssignChallengeToMatchDto,
    @Param('id') _id: string,
  ): Promise<void> {
    return await this.challengesService.atribuirDesafioPartida(
      _id,
      assignChallengeToMatchDto,
    );
  }

  @Delete('/:_id')
  async deletarDesafio(@Param('_id') _id: string): Promise<void> {
    await this.challengesService.deletarDesafio(_id);
  }
}
