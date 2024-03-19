import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma.service';
import { CreateLectureDTO } from '../dto/create-lecture.dto';

import { readFile } from 'fs/promises';
import { compile } from 'handlebars';
import { MailService } from 'src/providers/mailer.service';

@Injectable()
export class LectureCreateService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
  ) {}

  async createLecture(
    createLectureDTO: CreateLectureDTO,
    meetId: string,
    userData: { githubId: string; speakerPhotoUrl: string },
  ) {
    try {
      const meet = await this.prisma.meet.findUnique({
        where: {
          id: meetId,
        },
      });

      if (!meet) {
        throw new HttpException('Event not found.', HttpStatus.NOT_FOUND);
      }

      if (meet.status_meet === 'canceled' || meet.status_meet === 'finished') {
        throw new HttpException(
          'The event has already been completed or cancelled.',
          HttpStatus.BAD_REQUEST,
        );
      }

      const isAnotherLectureAtTheSameTime = await this.prisma.lecture.findFirst(
        {
          where: {
            speaker_email: createLectureDTO.speaker_email,
            datetime: meet.start_time,
          },
        },
      );

      if (isAnotherLectureAtTheSameTime) {
        throw new HttpException(
          'The speaker already has a lecture scheduled for this time.',
          HttpStatus.CONFLICT, // 409 Conflict
        );
      }

      const today = new Date();
      const twoDaysLater = new Date(today);
      twoDaysLater.setDate(twoDaysLater.getDate() + 2);
      const meetStartTime = new Date(meet.start_time);

      if (meetStartTime <= twoDaysLater) {
        throw new HttpException(
          'The lecture must be scheduled at least 2 days in advance.',
          HttpStatus.CONFLICT, // 409 Conflict
        );
      }

      // nome do organizador
      const manager = await this.prisma.manager.findFirst({
        where: {
          id: meet.manager_id,
        },
      });

      if (!manager) {
        throw new HttpException(
          'The name of the organizer could not be found.',
          HttpStatus.BAD_REQUEST,
        );
      }

      const lecture = await this.prisma.lecture.create({
        data: {
          ...createLectureDTO,
          datetime: meet.start_time,
          github_id: userData.githubId,
          speaker_photo_url: userData.speakerPhotoUrl,
          meet: {
            connect: {
              id: meetId,
            },
          },
        },
      });

      //envio de emails
      //email para o organizador
      const mailTemplate = (
        await readFile('./src/templates/lecture-proposal.hbs')
      ).toString();

      const subjectProposal = 'Nova Palestra Cadastrada!';

      const dynamicVariablesProposal = {
        manager_name: manager.name,
        meet_name: meet.title,
        lecture_title: lecture.title,
        speaker_name: lecture.speaker_name,
        lecture_date_time: meet.start_time,
        lecture_description: lecture.description,
        link_meet_lectures: `http://localhost:3000/api-manager/meet/${meetId}/lecture`,
        platform_name: 'ComuniCubos',
      };

      const mailProposal = compile(mailTemplate)(dynamicVariablesProposal);

      await this.mailService.sendMail(
        manager.email,
        subjectProposal,
        mailProposal,
      );

      //email para o palestrante
      const mailTemplateProposalStatus = (
        await readFile('./src/templates/lecture-proposal-status.hbs')
      ).toString();

      const subjectProposalStatus = 'Palestra Cadastrada!';

      const dynamicVariables = {
        speaker_name: lecture.speaker_name,
        lecture_title: lecture.title,
        meet_name: meet.title,
        status_link: `http://localhost:3000/meet/${meetId}/lecture/${lecture.id}`,
        platform_name: 'ComuniCubos',
      };

      const mailProposalStatus = compile(mailTemplateProposalStatus)(
        dynamicVariables,
      );

      await this.mailService.sendMail(
        manager.email,
        subjectProposalStatus,
        mailProposalStatus,
      );
      return lecture;
    } catch (error) {
      if (error instanceof HttpException) {
        // Se o erro já é uma HttpException, simplesmente o lance novamente.
        throw error;
      } else {
        // Para qualquer outro tipo de erro, logue e lance uma HttpException genérica.
        console.error(error);
        throw new HttpException(
          'Error processing the request.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
