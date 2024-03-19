import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ZodValidationPipe } from 'nestjs-zod';
import { MailerModule } from '@nestjs-modules/mailer';

import { MailService } from 'src/providers/mailer.service';
import { PrismaService } from 'src/providers/prisma.service';

import { ApiManagerController } from './api-manager.controller';

import { ShowLectureService } from './services/show-lecture.service';
import { ConfirmLectureService } from './services/confirm-lecture.service';
import { DetailMeetByIdService } from './services/detail-meet-by-id.service';
import { DesconfirmLectureService } from './services/desconfirm-lecture.service';
import { FindMeetsByManagersService } from './services/find-meets-by-manager.service';

import { DesconfirmLecture } from './dto/desconfirm-lecture.dto';

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
