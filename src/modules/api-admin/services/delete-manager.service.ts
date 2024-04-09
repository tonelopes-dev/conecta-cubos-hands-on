import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma.service';

@Injectable()
export class DeleteManagerService {
  constructor(private prismaService: PrismaService) {}

  async execute(ManagerId: string) {
    const manager = await this.prismaService.manager.findFirst({
      where: { id: ManagerId },
    });

    if (!manager) {
      throw new HttpException('Manager not found.', HttpStatus.NOT_FOUND);
    }

    await this.prismaService.manager.delete({ where: { id: ManagerId } });
  }
}
