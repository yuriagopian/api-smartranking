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
        (player) => player._id == createChallengeDto.solicitante,
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
        createChallengeDto.solicitante,
      );

    /*
        Para prosseguir o solicitante deve fazer parte de uma categoria
        */
    if (!categoriaDoplayer) {
      throw new BadRequestException(
        `O solicitante precisa estar registrado em uma categoria!`,
      );
    }

    const desafioCriado = new this.challengeModel(createChallengeDto);
    desafioCriado.categoria = categoriaDoplayer.categoria;
    desafioCriado.dataHoraSolicitacao = new Date();
    /*
        Quando um desafio for criado, definimos o status desafio como pendente
        */
    desafioCriado.status = ChallengeStatus.PENDING;
    this.logger.log(`desafioCriado: ${JSON.stringify(desafioCriado)}`);
    return await desafioCriado.save();
  }

  async consultarTodosDesafios(): Promise<Array<Challenge>> {
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

  async atualizarDesafio(
    _id: string,
    updatePlayerDto: UpdatePlayerDto,
  ): Promise<void> {
    const desafioEncontrado = await this.challengeModel.findById(_id).exec();

    if (!desafioEncontrado) {
      throw new NotFoundException(`Desafio ${_id} não cadastrado!`);
    }

    /*
        Atualizaremos a data da resposta quando o status do desafio vier preenchido 
        */
    if (updatePlayerDto.status) {
      desafioEncontrado.dataHoraResposta = new Date();
    }
    desafioEncontrado.status = updatePlayerDto.status;
    desafioEncontrado.dataHoraDesafio = updatePlayerDto.dataHoraDesafio;

    await this.challengeModel
      .findOneAndUpdate({ _id }, { $set: desafioEncontrado })
      .exec();
  }

  async atribuirDesafioPartida(
    _id: string,
    atribuirDesafioPartidaDto: AtribuirDesafioPartidaDto,
  ): Promise<void> {
    const desafioEncontrado = await this.challengeModel.findById(_id).exec();

    if (!desafioEncontrado) {
      throw new BadRequestException(`Desafio ${_id} não cadastrado!`);
    }

    /*
        Verificar se o player vencedor faz parte do desafio
        */
    const playerFilter = desafioEncontrado.players.filter(
      (player) => player._id == atribuirDesafioPartidaDto.def,
    );

    this.logger.log(`desafioEncontrado: ${desafioEncontrado}`);
    this.logger.log(`playerFilter: ${playerFilter}`);

    if (playerFilter.length == 0) {
      throw new BadRequestException(
        `O player vencedor não faz parte do desafio!`,
      );
    }

    /*
        Primeiro vamos criar e persistir o objeto partida
        */
    const partidaCriada = new this.matchModel(atribuirDesafioPartidaDto);

    /*
       Atribuir ao objeto partida a categoria recuperada no desafio
       */
    partidaCriada.categoria = desafioEncontrado.categoria;

    /*
       Atribuir ao objeto partida os players que fizeram parte do desafio
       */
    partidaCriada.players = desafioEncontrado.players;

    const resultado = await partidaCriada.save();

    /*
        Quando uma partida for registrada por um usuário, mudaremos o 
        status do desafio para realizado
        */
    desafioEncontrado.status = DesafioStatus.REALIZADO;

    /*  
        Recuperamos o ID da partida e atribuimos ao desafio
        */
    desafioEncontrado.partida = resultado._id;

    try {
      await this.challengeModel
        .findOneAndUpdate({ _id }, { $set: desafioEncontrado })
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

  async deletarDesafio(_id: string): Promise<void> {
    const desafioEncontrado = await this.challengeModel.findById(_id).exec();

    if (!desafioEncontrado) {
      throw new BadRequestException(`Desafio ${_id} não cadastrado!`);
    }

    /*
        Realizaremos a deleção lógica do desafio, modificando seu status para
        CANCELADO
        */
    desafioEncontrado.status = DesafioStatus.CANCELADO;

    await this.challengeModel
      .findOneAndUpdate({ _id }, { $set: desafioEncontrado })
      .exec();
  }
}
