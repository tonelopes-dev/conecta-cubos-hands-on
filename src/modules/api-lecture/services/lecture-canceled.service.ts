import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma.service';

@Injectable()
export class LectureCanceledService {
  constructor(private prisma: PrismaService) {}

  async canceledLecture(meetId: string, lectureId: string) {
    try {
      const lecture = await this.prisma.lecture.findUnique({
        where: {
          id: lectureId,
        },
      });

      if (!lecture) {
        throw new HttpException(
          'We were unable to change the status of the lecture, please contact the Organizer.',
          HttpStatus.BAD_REQUEST,
        );
      }

      await this.prisma.lecture.update({
        data: { status_lecture: 'canceled', iscancelled: true },
        where: { id: lectureId, meet_id: meetId },
      });

      return;
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
