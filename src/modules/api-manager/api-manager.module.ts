import { Module } from '@nestjs/common';
import { ApiManagerController } from './api-manager.controller';
import { PrismaService } from 'src/providers/prisma.service';
import { FindMeetsByManagersService } from './services/find-meets-by-manager.service';
import { DetailMeetByIdService } from './services/detail-meet-by-id.service';
import { ConfirmLectureService } from './services/confirm-lecture.service';
import { MailService } from 'src/providers/mailer.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { DesconfirmLecture } from './dto/desconfirm-lecture.dto';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { DesconfirmLectureService } from './services/desconfirm-lecture.service';
import { ShowLectureService } from './services/show-lecture.service';

@Module({
  controllers: [ApiManagerController],
  providers: [
    PrismaService,
    MailService,
    FindMeetsByManagersService,
    DetailMeetByIdService,
    ConfirmLectureService,
    DesconfirmLectureService,
    DesconfirmLecture,
    ShowLectureService,
    { provide: APP_PIPE, useClass: ZodValidationPipe },
  ],
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.MAILER_HOST,
        secure: false,
        port: Number(process.env.MAILER_PORT),
        auth: {
          user: process.env.MAILER_USER,
          pass: process.env.MAILER_PASS,
        },
      },
      defaults: {
        from: process.env.MAILER_FROM,
      },
    }),
  ],
})
export class ApiManagerModule {}
