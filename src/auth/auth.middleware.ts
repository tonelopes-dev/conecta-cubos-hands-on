import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from 'src/providers/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = this.extractTokenFromHeader(req);
    //console.log('extracted token:', token);

    if (!token) {
      req.body.user = { role: 'visitor' };

      console.log('got a visitor');

      return next();
    }

    try {
      const decodedToken = await this.jwtService.verifyAsync(token);
      console.log('decodedToken:', decodedToken);

      const admin = await this.prismaService.admin.findUnique({
        where: {
          id: decodedToken.id,
        },
      });

      if (admin) {
        const { token: _, ...returnedAdmin } = admin;
        req.body.user = { role: 'admin', ...returnedAdmin };
        console.log('got a admin:', admin);

        return next();
      }

      const manager = await this.prismaService.manager.findUnique({
        where: {
          id: decodedToken.id,
        },
      });

      if (manager) {
        const { token: _, ...returnedManager } = manager;

        req.body.user = { role: 'manager', ...returnedManager };
        console.log('got a manager:', manager);

        return next();
      }
    } catch {
      throw new UnauthorizedException();
    }

    req.body.user = { role: 'visitor' };
    return next();
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers?.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
