import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { MeetIdParamDto } from '../dto/meetDto';

@Injectable()
export class DetailMeetByIdService {
    constructor(private prisma: PrismaService) {}

    async execute(param: MeetIdParamDto) {
        try {
            const meet = await this.prisma.meet.findFirst({
                where: { id: param.id },
            });

            if (!meet) {
                throw new HttpException(
                    'Reunião não encontrada!',
                    HttpStatus.BAD_REQUEST,
                );
            }

            const { name: manager_name, email } =
                await this.prisma.manager.findFirst({
                    where: { id: meet.manager_id },
                });

            return {
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
        } catch (error) {
            throw new HttpException(
                'Erro inesperado do servidor.',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
