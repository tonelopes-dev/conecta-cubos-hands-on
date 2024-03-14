import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma.service';

@Injectable()
export class DeactivateManagerService {
  constructor(private prismaService: PrismaService) {}

  async execute(id: string) {
    try {
      const manager = await this.prismaService.manager.findUnique({
        where: { id },
      });

      if (!manager) {
        return new HttpException('Manager not found', HttpStatus.BAD_REQUEST);
      }

      if (!manager.isactive) {
        return new HttpException(
          'Manager already deactivated',
          HttpStatus.BAD_REQUEST,
        );
      }

      const deactivatedManager = await this.prismaService.manager.update({
        where: { id },
        data: {
          isactive: false,
        },
      });

      return deactivatedManager;
    } catch {
      return new HttpException(
        'Unexpected error on server',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
