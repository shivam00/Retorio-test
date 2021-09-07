import {
  HttpService,
  Injectable,
  ServiceUnavailableException,
} from '@nestjs/common';
import { header } from '../constant';

@Injectable()
export class FootballApiService {
  constructor(private readonly httpService: HttpService) {}

  /**
   *
   * @param season
   * @param teamName
   * @param competitionCode
   */
  async getComp({ season, teamName, competitionCode }): Promise<{
    startDate: string;
    endDate: string;
    id: number;
    address: string;
    phone: string;
    website: string;
    teamId: number;
  }> {
    try {
      const {
        season: { startDate, endDate },
        teams,
        competition: { id },
      } = (
        await this.requestUri(
          `https://api.football-data.org/v2/competitions/${competitionCode}/teams?season=${season}`,
        )
      ).data;
      const {
        address,
        phone,
        website,
        id: teamId,
      } = teams.filter((team) => team.name === teamName)[0];
      return {
        startDate,
        endDate,
        id,
        address,
        phone,
        website,
        teamId,
      };
    } catch (error) {
      console.error(error);
      throw new ServiceUnavailableException();
    }
  }

  /**
   *
   * @param startDate
   * @param endDate
   * @param id
   * @param venue
   * @param teamId
   */
  async getMatchResult({ startDate, endDate, id, venue, teamId }): Promise<{
    won: number;
    lost: number;
    totalGoal: number;
    totalMatch: number;
  }> {
    try {
      let totalGoal = 0,
        won = 0,
        lost = 0,
        totalMatch = 0;
      const result = (
        await this.requestUri(
          `http://api.football-data.org/v2/teams/${teamId}/matches/?dateFrom=${startDate}&dateTo=${endDate}&venue=${venue}&status=FINISHED`,
        )
      ).data.matches.filter((match) => match.competition.id === id);
      result.forEach((match) => {
        totalGoal += match.score.fullTime[`${venue.toLowerCase()}Team`];
        totalMatch += 1;
        if (match.score.winner === `${venue}_TEAM`) {
          won += 1;
          return;
        }
        if (match.score.winner !== 'DRAW') {
          lost += 1;
        }
      });
      return {
        won,
        lost,
        totalGoal,
        totalMatch,
      };
    } catch (error) {
      console.error(error);
      throw new ServiceUnavailableException();
    }
  }

  /**
   *
   * @param url
   */
  async requestUri(url: string): Promise<any> {
    return this.httpService
      .get(`${url}`, {
        headers: header,
      })
      .toPromise();
  }
}
