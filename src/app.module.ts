import { HttpModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FootballApiService } from './football/football-api.service';

@Module({
  imports: [HttpModule],
  controllers: [AppController],
  providers: [AppService, FootballApiService],
})
export class AppModule {}
