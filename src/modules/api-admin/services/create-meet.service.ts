import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { readFile } from 'fs/promises';
import { compile } from 'handlebars';
import { CreateMeetDto } from 'src/modules/api-manager/dto/meet.dto';
import { MailService } from 'src/providers/mailer.service';
import { PrismaService } from 'src/providers/prisma.service';

@Injectable()
export class CreateMeetService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mailerService: MailService,
  ) {}

  async execute(manager_id: string, data: CreateMeetDto, req: Request) {
    const { user, ...meetData } = req.body;

    try {
      const meetExists = await this.prismaService.meet.findFirst({
        where: { manager_id },
      });

      if (meetExists) {
        return new HttpException(
          'Manager has scheduled meet already',
          HttpStatus.BAD_REQUEST,
        );
      }

      const manager = await this.prismaService.manager.findFirst({
        where: { id: manager_id },
      });

      if (!manager) {
        return new HttpException('Manager not found', HttpStatus.BAD_REQUEST);
      }

      const createdMeet = await this.prismaService.meet.create({
        data: {
          manager_id,
          admin_id: user.id,
          datetime: new Date(meetData.datetime),
          ...meetData,
        },
      });

      const mailTemplate = (
        await readFile('./src/templates/send-manager-meet-data.hbs')
      ).toString();

      const subject = 'Evento criado!';

      const dynamicVariables = {
        manager_name: manager.name,
        title: createdMeet.title,
        token: manager.token,
        id: createdMeet.id,
        datetime: createdMeet.datetime,
      };

      const mail = compile(mailTemplate)(dynamicVariables);

      this.mailerService.sendMail(manager.email, subject, mail);

      return HttpStatus.CREATED;
    } catch (error) {
      console.log(error);
      return new HttpException(
        'Unexpected error:',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
