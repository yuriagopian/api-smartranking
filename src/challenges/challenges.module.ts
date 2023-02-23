import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { challengeSchema } from './schemas/challenge.schema';
import { matchSchema } from './schemas/match.schema';
import { PlayersModule } from '../players/players.module';
import { CategoriesModule } from '../categories/categories.module';
import { ChallengesController } from './challenges.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Challenge', schema: challengeSchema },
      { name: 'Partida', schema: matchSchema },
    ]),
    PlayersModule,
    CategoriesModule,
  ],
  controllers: [ChallengesController],
  providers: [ChallengesService],
})
export class DesafiosModule {}
