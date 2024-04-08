import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma.service';

@Injectable()
export class FindMeetsByManagersService {
  constructor(private prisma: PrismaService) {}
  async execute(managerId: string) {
    try {
      const meets = await this.prisma.meet.findMany({
        where: { manager_id: managerId },
      });

      if (meets.length === 0) {
        return new HttpException(
          'Meets not found for informed manager!',
          HttpStatus.BAD_REQUEST,
        );
      }

      const { name } = await this.prisma.manager.findFirst({
        where: { id: managerId },
      });

      if (!name) {
        return new HttpException('Manager not found!', HttpStatus.BAD_REQUEST);
      }

      if (meets.length > 1) {
        const result = [];
        for (const meet of meets) {
          result.push({
            name: meet.title,
            summary: meet.summary,
            date: meet.datetime,
            manager: name,
          });
        }
        return result;
      }

      return {
        name: meets[0].title,
        summary: meets[0].summary,
        date: meets[0].datetime,
        manager: name,
      };
    } catch (error) {
      return new HttpException(
        'Unexpected error.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
