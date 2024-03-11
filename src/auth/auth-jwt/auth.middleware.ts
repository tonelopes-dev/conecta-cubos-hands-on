import {
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
      const isValid = await this.jwtService.verifyAsync(token);
      //console.log('isValid:', isValid);

      const admin = await this.prismaService.admin.findUnique({
        where: {
          id: isValid.id,
        },
      });

      if (admin) {
        const { token: _, ...returnedAdmin } = admin;
        req.body.user = { role: 'admin', ...returnedAdmin };
        console.log('got a admin');

        return next();
      }

      const manager = await this.prismaService.manager.findUnique({
        where: {
          id: isValid.id,
        },
      });

      if (manager) {
        const { token: _, ...returnedManager } = manager;

        req.body.user = { role: 'manager', ...returnedManager };
        console.log('got a manager');

        return next();
      }
      
    } catch {
      throw new UnauthorizedException();
    }
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers?.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
