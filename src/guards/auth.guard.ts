import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { TOKEN } from '../constant';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { token: token } = request.headers;
    const isEqual: boolean = token === TOKEN;
    if (!isEqual) {
      throw new HttpException('Unauthenticated', HttpStatus.UNAUTHORIZED);
    }
    return true;
  }
}
