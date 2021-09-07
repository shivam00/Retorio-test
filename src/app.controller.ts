import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './guards/auth.guard';
import { DataInterface } from './data.interface';
import { ApiBody, ApiResponse, ApiHeader } from '@nestjs/swagger';
import { Payload } from './swagger';

@Controller()
@UseGuards(AuthGuard)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @ApiBody({
    type: Payload,
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success Ok.' })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request.' })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthenticated.',
  })
  @ApiResponse({ status: HttpStatus.FORBIDDEN, description: 'Forbidden.' })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Not Found.' })
  @ApiHeader({
    name: 'token',
    description: '8dccc1eaa3154e389b26d4a55ec998db',
  })
  async getData(
    @Body()
    payload: {
      season: string;
      teamName: string;
      competitionCode: string;
    },
  ): Promise<DataInterface> {
    return await this.appService.getData(payload);
  }
}
