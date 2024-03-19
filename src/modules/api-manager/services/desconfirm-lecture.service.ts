import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { compile } from 'handlebars';
import { MailService } from 'src/providers/mailer.service';
import { PrismaService } from 'src/providers/prisma.service';

@Injectable()
export class DesconfirmLectureService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
  ) {}

  async execute(meetId: string, lectureId: string, reason?: string) {
    try {
      const meet = await this.prisma.meet.findUnique({
        where: { id: meetId },
      });

      if (!meet) {
        return new HttpException('meet not found.', HttpStatus.NOT_FOUND);
      }

      const lecture = await this.prisma.lecture.findUnique({
        where: {
          id: lectureId,
          meet_id: meetId,
        },
      });

      if (!lecture) {
        return new HttpException(
          'This lecture is not registered.',
          HttpStatus.NOT_FOUND,
        );
      }

      const mailTemplate = (
        await readFile('./src/templates/cancelMeet.hbs')
      ).toString();

      const subject = 'Atualização da situação da palestra.';

      const dynamicVariables = {
        speaker_name: lecture.speaker_name,
        title: lecture.title,
        meet_title: meet.title,
        reason,
      };

      const mail = compile(mailTemplate)(dynamicVariables);

      await this.mailService.sendMail(lecture.speaker_email, subject, mail);

      await this.prisma.lecture.update({
        data: { status_lecture: 'canceled' },
        where: { id: lectureId, meet_id: meetId },
      });
    } catch (error) {
      console.log(error);
      return new HttpException(
        'Internal Server Error.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
