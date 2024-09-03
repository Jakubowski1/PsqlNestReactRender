import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private jwtService: JwtService, private configService: ConfigService) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    // Check for the JWT token in the cookies
    const token = request.cookies?.jwt;

    if (!token) {
      throw new UnauthorizedException('JWT token is missing from cookies');
    }

    const secret = this.configService.get<string>('JWT_SECRET');
    try {
      // Verify the token using the JWT secret
      const payload = this.jwtService.verify(token, { secret });
      // Attach the payload to the request object
      request.user = payload;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }

    return super.canActivate(context);
  }
}
