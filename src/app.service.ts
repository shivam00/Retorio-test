import { HttpService, Injectable } from '@nestjs/common';
import { DataInterface } from './data.interface';
import { FootballApiService } from './football/football-api.service';

@Injectable()
export class AppService {
  constructor(
    private readonly httpService: HttpService,
    private readonly footballApi: FootballApiService,
  ) {}

  async getData(payload: {
    season: string;
    teamName: string;
    competitionCode: string;
  }): Promise<DataInterface> {
    const { season, teamName, competitionCode } = payload;
    const { teamId, startDate, endDate, id, address, phone, website } =
      await this.footballApi.getComp({ season, teamName, competitionCode });
    const resultHome = await this.footballApi.getMatchResult({
      startDate,
      endDate,
      id,
      venue: 'HOME',
      teamId,
    });
    const resultAway = await this.footballApi.getMatchResult({
      startDate,
      endDate,
      id,
      venue: 'AWAY',
      teamId,
    });

    return {
      address,
      phone,
      website,
      home: {
        won: resultHome.won,
        lost: resultHome.lost,
      },
      away: {
        won: resultAway.won,
        lost: resultAway.lost,
      },
      avgGoalScored:
        (resultAway.totalGoal + resultHome.totalGoal) /
        (resultHome.totalMatch + resultAway.totalMatch),
    };
  }
}
