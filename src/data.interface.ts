export interface DataInterface {
  address: string;
  phone: string;
  website: string;
  home: GameDataInterface;
  away: GameDataInterface;
  avgGoalScored: number;
}

interface GameDataInterface {
  won: number;
  lost: number;
}
