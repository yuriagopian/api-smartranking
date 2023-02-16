import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { PlayersModule } from './players/players.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGO_DB_URI'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }),
    }),
    PlayersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
