import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma.service';

@Injectable()
export class DeleteMeetService {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(id: string) {
    try {
      const meetExists = await this.prismaService.meet.findUnique({
        where: { id },
      });

      if (!meetExists) {
        return new HttpException('Meet not found', HttpStatus.NOT_FOUND);
      }

      await this.prismaService.meet.delete({
        where: { id },
      });

      return new HttpException('Meet deleted!', HttpStatus.NO_CONTENT);
    } catch {
      return new HttpException(
        'Unexpected error!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
