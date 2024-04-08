// import { MeetIdParamDto } from '../dto/meetDto';
import { PrismaService } from 'src/providers/prisma.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
//import { MeetIdParamDto } from '../dto/meet.dto';

@Injectable()
export class DetailMeetByIdService {
  constructor(private prisma: PrismaService) {}

  async execute(id: string) {
    try {
      // fetch the meet
      const meet = await this.prisma.meet.findFirst({
        where: { id },
      });
      //console.log('meet found');

      if (!meet) {
        return new HttpException('Meet not found!', HttpStatus.BAD_REQUEST);
      }

      const { name: manager_name, email } = await this.prisma.manager.findFirst(
        {
          where: { id: meet.manager_id },
        },
      );

      if (!email) {
        return new HttpException(
          'No meets for the informed manager',
          HttpStatus.BAD_REQUEST,
        );
      }

      //fetch the lectures of the meet

      const lectures = await this.prisma.lecture.findMany({
        where: { meet_id: meet.id },
      });

      const preparedMeetData = {
        id: meet.id,
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
              zipcode: meet.address_zip,
              city: meet.address_city,
              state: meet.address_state,
              district: meet.address_district,
              complement: meet.address_complement,
            }
          : `on-line`,
        link: meet.link,
        start_time: meet.start_time,
        end_time: meet.end_time,
        meet_status: meet.status_meet,
        lectures: lectures ?? [],
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
