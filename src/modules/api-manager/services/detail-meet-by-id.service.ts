import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma.service';
//import { MeetIdParamDto } from '../dto/meet.dto';

@Injectable()
export class DetailMeetByIdService {
  constructor(private prisma: PrismaService) {}

  async execute(id: string) {
    try {
      const meet = await this.prisma.meet.findFirst({
        where: { id },
      });
      console.log('meet found');

      if (!meet) {
        return new HttpException('Meet not found!', HttpStatus.BAD_REQUEST);
      }

      const { name: manager_name, email } = await this.prisma.manager.findFirst(
        {
          where: { id: meet.manager_id },
        },
      );

      const preparedMeetData = {
        title: meet.title,
        summary: meet.summary,
        image_link: meet.image_link,
        date: meet.datetime,
        manager: manager_name,
        manager_email: email,
        address: meet.address
          ? {
              street: meet.address,
              number: meet.address_number,
              district: meet.address_district,
              city: meet.address_city,
            }
          : `on-line`,
        link: meet.link,
        start_time: meet.start_time,
        end_time: meet.end_time,
      };

      console.log('meet prepared:', preparedMeetData);
      return preparedMeetData;
    } catch (error) {
      return new HttpException(
        'Unexpected error.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
