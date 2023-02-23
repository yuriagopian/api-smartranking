import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoriesService } from 'src/categories/categories.service';
import { UpdatePlayerDto } from 'src/players/dtos/update-player.dto';
import { PlayersService } from 'src/players/players.service';
import { AssignChallengeToMatchDto } from './dtos/assign-challenge-to-match.dto';
import { CreateChallengeDto } from './dtos/create-challenge.dto';
import { ChallengeStatus } from './interfaces/challenge-status.enum';
import { Challenge } from './schemas/challenge.schema';
import { Match } from './schemas/match.schema';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectModel('Challenge') private readonly challengeModel: Model<Challenge>,
    @InjectModel('Match') private readonly matchModel: Model<Match>,
    private readonly playersService: PlayersService,
    private readonly categoriesService: CategoriesService,
  ) {}

  private readonly logger = new Logger(ChallengesService.name);

  async createChallenge(
    createChallengeDto: CreateChallengeDto,
  ): Promise<Challenge> {
    const players = await this.playersService.listPlayers();

    createChallengeDto.players.map((playerDto) => {
      const playerFilter = players.filter(
        (player) => player._id == playerDto._id,
      );

      if (playerFilter.length == 0) {
        throw new BadRequestException(`O id ${playerDto._id} não é um player!`);
      }
    });

    const solicitanteEhplayerDaPartida =
      await createChallengeDto.players.filter(
        (player) => player._id == createChallengeDto.requesters,
      );

    this.logger.log(
      `solicitanteEhplayerDaPartida: ${solicitanteEhplayerDaPartida}`,
    );

    if (solicitanteEhplayerDaPartida.length == 0) {
      throw new BadRequestException(
        `O solicitante deve ser um player da partida!`,
      );
    }

    /*
        Descobrimos a categoria com base no ID do player solicitante
        */
    const categoriaDoplayer =
      await this.categoriesService.consultarCategoriaDoplayer(
        createChallengeDto.requesters,
      );

    /*
        Para prosseguir o solicitante deve fazer parte de uma categoria
        */
    if (!categoriaDoplayer) {
      throw new BadRequestException(
        `O solicitante precisa estar registrado em uma categoria!`,
      );
    }

    const challengeCreated = new this.challengeModel(createChallengeDto);
    challengeCreated.category = categoriaDoplayer.categoria;
    challengeCreated.dateTimeRequest = new Date();
    /*
        Quando um desafio for criado, definimos o status desafio como pendente
        */
    challengeCreated.status = ChallengeStatus.PENDING;
    this.logger.log(`challengeCreated: ${JSON.stringify(challengeCreated)}`);
    return await challengeCreated.save();
  }

  async listChallenges(): Promise<Array<Challenge>> {
    return await this.challengeModel
      .find()
      .populate('solicitante')
      .populate('players')
      .populate('partida')
      .exec();
  }

  async consultarDesafiosDeUmplayer(_id: any): Promise<Array<Challenge>> {
    const players = await this.playersService.consultarTodosplayers();

    const playerFilter = players.filter((player) => player._id == _id);

    if (playerFilter.length == 0) {
      throw new BadRequestException(`O id ${_id} não é um player!`);
    }

    return await this.challengeModel
      .find()
      .where('players')
      .in(_id)
      .populate('solicitante')
      .populate('players')
      .populate('partida')
      .exec();
  }

  async updateChallenge(
    _id: string,
    updatePlayerDto: UpdatePlayerDto,
  ): Promise<void> {
    const challengeFound = await this.challengeModel.findById(_id).exec();

    if (!challengeFound) {
      throw new NotFoundException(`Desafio ${_id} não cadastrado!`);
    }

    /*
        Atualizaremos a data da resposta quando o status do desafio vier preenchido 
        */
    if (updatePlayerDto.status) {
      challengeFound.dateTimeResponse = new Date();
    }
    challengeFound.status = updatePlayerDto.status;
    challengeFound.dateTimeChallenge = updatePlayerDto.dataHoraDesafio;

    await this.challengeModel
      .findOneAndUpdate({ _id }, { $set: challengeFound })
      .exec();
  }

  async atribuirDesafioPartida(
    _id: string,
    assignChallengeToMatchDto: AssignChallengeToMatchDto,
  ): Promise<void> {
    const challengeFound = await this.challengeModel.findById(_id).exec();

    if (!challengeFound) {
      throw new BadRequestException(`Desafio ${_id} não cadastrado!`);
    }

    const playerFilter = challengeFound.players.filter(
      (player) => player._id == assignChallengeToMatchDto.def,
    );

    this.logger.log(`challengeFound: ${challengeFound}`);
    this.logger.log(`playerFilter: ${playerFilter}`);

    if (playerFilter.length == 0) {
      throw new BadRequestException(
        `O player vencedor não faz parte do desafio!`,
      );
    }

    /*
        Primeiro vamos criar e persistir o objeto partida
        */
    const matchCreated = new this.matchModel(assignChallengeToMatchDto);

    /*
       Atribuir ao objeto partida a categoria recuperada no desafio
       */
    matchCreated.categora = challengeFound.categoria;

    /*
       Atribuir ao objeto partida os players que fizeram parte do desafio
       */
    matchCreated.players = challengeFound.players;

    const resultado = await matchCreated.save();

    /*
        Quando uma partida for registrada por um usuário, mudaremos o 
        status do desafio para .DONE
        */
    challengeFound.status = ChallengeStatus.DONE;

    /*  
        Recuperamos o ID da partida e atribuimos ao desafio
        */
    challengeFound.partida = resultado._id;

    try {
      await this.challengeModel
        .findOneAndUpdate({ _id }, { $set: challengeFound })
        .exec();
    } catch (error) {
      /*
            Se a atualização do desafio falhar excluímos a partida 
            gravada anteriormente
            */
      await this.matchModel.deleteOne({ _id: resultado._id }).exec();
      throw new InternalServerErrorException();
    }
  }

  async deleteChallenge(_id: string): Promise<void> {
    const challengeFound = await this.challengeModel.findById(_id).exec();

    if (!challengeFound) {
      throw new BadRequestException(`Desafio ${_id} não cadastrado!`);
    }

    /*
        Realizaremos a deleção lógica do desafio, modificando seu status para
        CANCELADO
        */
    challengeFound.status = ChallengeStatus.CANCELED;

    await this.challengeModel
      .findOneAndUpdate({ _id }, { $set: challengeFound })
      .exec();
  }
}
