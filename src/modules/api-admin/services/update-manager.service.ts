import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateManagerDTO } from 'src/modules/api-manager/dto/manager.dto';
import { PrismaService } from 'src/providers/prisma.service';

@Injectable()
export class UpdateManagerService {
  constructor(private prismaService: PrismaService) {}

  async execute(managerId: string, { email, name }: UpdateManagerDTO) {
    try {
      const manager = await this.prismaService.manager.findFirst({
        where: { id: managerId },
      });

      if (!manager) {
        throw new HttpException('Manager not found.', HttpStatus.NOT_FOUND);
      }

      if (!manager.isactive) {
        throw new HttpException(
          'The manager is not active.',
          HttpStatus.BAD_REQUEST,
        );
      }

      if (email && email !== manager.email) {
        const emailExist = await this.prismaService.manager.findFirst({
          where: { email },
        });

        if (emailExist) {
          throw new HttpException(
            'Email already used.',
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      return this.prismaService.manager.update({
        data: {
          name,
          email,
        },
        where: { id: managerId },
      });
    } catch (error) {
      throw new HttpException(
        'Unexpected Internal Server Error.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
