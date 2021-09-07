import { ApiProperty } from '@nestjs/swagger';

export class Payload {
  @ApiProperty()
  season: string;
  @ApiProperty()
  teamName: string;
  @ApiProperty()
  competitionCode: string;
}
