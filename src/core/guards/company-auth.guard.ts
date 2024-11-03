import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../../auth/auth.service';

@Injectable()
export class CompanyAuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    const user = { companyId: '' }
    // await this.authService.validateToken(token);
    if (!user || !user.companyId) {
      throw new UnauthorizedException('Invalid token');
    }

    request.user = user; // Добавляем пользователя в запрос для дальнейшего использования
    return true;
  }
}