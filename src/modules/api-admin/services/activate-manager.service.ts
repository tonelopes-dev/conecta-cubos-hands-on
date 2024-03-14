import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma.service';

@Injectable()
export class ActivateManagerService {
  constructor(private prismaService: PrismaService) {}

  async execute(id: string) {
    try {
      const manager = await this.prismaService.manager.findUnique({
        where: { id },
      });

      if (!manager) {
        return new HttpException('Manager not found', HttpStatus.BAD_REQUEST);
      }

      if (manager.isactive) {
        return new HttpException(
          'Manager already active',
          HttpStatus.BAD_REQUEST,
        );
      }

      const activatedManager = await this.prismaService.manager.update({
        where: { id },
        data: {
          isactive: true,
        },
      });

      return activatedManager;
    } catch {
      return new HttpException(
        'Unexpected error on server',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
