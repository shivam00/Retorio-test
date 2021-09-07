import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/common';
import { AppService } from './app.service';
import { FootballApiMockService } from './football/football-api.mock.service';
import { FootballApiService } from './football/football-api.service';

describe('App Service', () => {
  let appService: AppService;

  const payload: {
    season: string;
    teamName: string;
    competitionCode: string;
  } = {
    season: '2017',
    teamName: 'Manchester City FC',
    competitionCode: 'PL',
  };

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [],
      imports: [HttpModule],
      providers: [
        AppService,
        {
          provide: FootballApiService,
          useClass: FootballApiMockService,
        },
      ],
    }).compile();

    appService = app.get<AppService>(AppService);
  });

  test('should be created', () => {
    expect(appService).toBeInstanceOf(AppService);
  }, 100000);

  test('App service', async () => {
    const result = await appService.getData(payload);
    expect(result).toEqual({
      address: 'Address',
      avgGoalScored: 0.6666666666666666,
      away: { lost: 5, won: 6 },
      home: { lost: 5, won: 6 },
      phone: '+44 67890987678',
      website: 'www.website.com',
    });
  }, 100000);
});
