import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ApiManagerService {
  constructor(private readonly prisma: PrismaService) {}

  async findMeetsByManager(managerId: string) {
    const meets = await this.prisma.meet.findMany({
      where: { manager_id: managerId },
    });

    const { firstname, lastname, github } = await this.prisma.manager.findFirst(
      {
        where: { id: managerId },
      },
    );

    if (meets.length > 1) {
      const result = [];
      for (const meet of meets) {
        result.push({
          name: meet.name,
          date: meet.date,
          place: meet.place,
          link: meet.link,
          manage: `${firstname} ${lastname}`,
          github,
        });
      }
      return result;
    }

    return {
      name: meets[0].name,
      date: meets[0].date,
      place: meets[0].place,
      link: meets[0].link,
      manager: `${firstname} ${lastname}`,
      github,
    };
  }
}
