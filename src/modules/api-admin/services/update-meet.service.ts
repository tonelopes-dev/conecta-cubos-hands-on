import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { readFile } from 'node:fs/promises';
import { compile } from 'handlebars';
import { UpdateMeetDTO } from 'src/modules/api-manager/dto/meet.dto';
import { PrismaService } from 'src/providers/prisma.service';
import { MailService } from 'src/providers/mailer.service';

@Injectable()
export class UpdateMeetService {
  constructor(
    private prismaService: PrismaService,
    private mailerService: MailService,
  ) {}

  async execute(meetId: string, adminId: string, data: UpdateMeetDTO) {
    try {
      const meetExists = await this.prismaService.meet.findFirst({
        where: { id: meetId, admin_id: adminId },
      });

      if (!meetExists) {
        throw new HttpException('Meet not found.', HttpStatus.NOT_FOUND);
      }

      const manager = await this.prismaService.manager.findFirst({
        where: { id: meetExists.manager_id },
      });

      if (!manager) {
        throw new HttpException('Manager not found', HttpStatus.BAD_REQUEST);
      }

      let dateStart: Date;
      let dateEnd: Date;
      let dateTime: Date;

      if (data.start_time) {
        dateStart = new Date(data.start_time);
      }

      if (data.end_time) {
        dateEnd = new Date(data.end_time);
      }

      if (data.datetime) {
        dateTime = new Date(data.datetime);
      }

      const updatedMeet = await this.prismaService.meet.update({
        data: {
          ...data,
          start_time: dateStart ? dateStart : meetExists.start_time,
          end_time: dateEnd ? dateEnd : meetExists.end_time,
          datetime: dateTime ? dateTime : meetExists.datetime,
        },
        where: { id: meetExists.id },
      });

      const mailTemplate = (
        await readFile('./src/templates/send-manager-meet-data.hbs')
      ).toString();

      const subject = 'Evento Atualizado!';

      const dynamicVariables = {
        manager_name: manager.name,
        title: updatedMeet.title,
        token: manager.token,
        id: updatedMeet.id,
        datetime: updatedMeet.datetime,
      };

      const mail = compile(mailTemplate)(dynamicVariables);

      this.mailerService.sendMail(manager.email, subject, mail);

      return updatedMeet;
    } catch (error) {
      throw new HttpException(
        error.message,
        error.status ?? HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
