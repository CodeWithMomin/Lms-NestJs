import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthRequest } from './types/auth-request.type';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request =
      context.switchToHttp().getRequest<AuthRequest>();

    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException(
        'Authorization header is missing',
      );
    }

    const [type, token] = authHeader.split(' ');

    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException(
        'Invalid authorization header',
      );
    }

    try {
      const payload = await this.jwtService.verifyAsync<{
        sub: string;
        email?: string;
        iat?: number;
        exp?: number;
      }>(token, {
        secret: process.env.JWT_SECRET,
      });

      request.user = payload;

      return true;
    } catch (error) {
      throw new UnauthorizedException(
        'Invalid or expired token',
      );
    }
  }
}