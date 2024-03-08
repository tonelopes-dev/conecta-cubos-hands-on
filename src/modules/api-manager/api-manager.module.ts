import { Module } from '@nestjs/common';
import { ApiManagerController } from './api-manager.controller';
import { PrismaService } from 'src/providers/prisma.service';
import { FindMeetsByManagersService } from './services/find-meets-by-manager.service';
import { DetailMeetByIdService } from './services/detail-meet-by-id.service';
import { ConfirmLectureService } from './services/confirm-lecture.service';
import { MailService } from 'src/providers/mailer.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
    controllers: [ApiManagerController],
    providers: [
        PrismaService,
        MailService,
        FindMeetsByManagersService,
        DetailMeetByIdService,
        ConfirmLectureService,
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
