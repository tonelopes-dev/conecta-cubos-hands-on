import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma.service';
import { IQueryParams } from '../dto/query-param-meet.dto';

@Injectable()
export class FindMeetsService {
  constructor(private prismaService: PrismaService) {}

  async execute({ dateStart, dateEnd, count, offSet }: IQueryParams) {
    try {
      let meets = await this.prismaService.meet.findMany({
        where: {
          manager: { isactive: true },
          start_time: {
            gte: new Date(),
          },
        },
        take: Number(count) || 5,
        skip: Number(offSet) || 0,
      });

      if (dateStart && dateEnd) {
        meets = await this.prismaService.meet.findMany({
          where: {
            manager: { isactive: true },
            start_time: {
              gte: new Date(dateStart),
              lte: new Date(dateEnd),
            },
          },
          take: Number(count),
          skip: Number(offSet),
        });
      }

      return meets;
    } catch (error) {
      return new HttpException(error.message, error.status);
    }
  }
}
