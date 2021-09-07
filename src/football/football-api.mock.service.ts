export class FootballApiMockService {
  /**
   *
   */
  async getMatchResult(): Promise<{
    won: number;
    lost: number;
    totalGoal: number;
    totalMatch: number;
  }> {
    return Promise.resolve({
      won: 6,
      lost: 5,
      totalGoal: 10,
      totalMatch: 15,
    });
  }

  /**
   *
   */
  async getComp(): Promise<{
    startDate: string;
    endDate: string;
    id: number;
    address: string;
    phone: string;
    website: string;
    teamId: number;
  }> {
    return Promise.resolve({
      startDate: '2018-5-6',
      endDate: '2019-5-6',
      id: 2021,
      address: 'Address',
      phone: '+44 67890987678',
      website: 'www.website.com',
      teamId: 51,
    });
  }
}
