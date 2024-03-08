import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma.service';
import { readFile } from 'fs/promises';
// import path from 'path';
import { compile } from 'handlebars';
import { MailService } from 'src/providers/mailer.service';

@Injectable()
export class ConfirmLectureService {
    constructor(
        private prisma: PrismaService,
        private mailService: MailService,
    ) {}

    async execute(meetId: string, lectureId: number) {
        try {
            const meet = await this.prisma.meet.findUnique({
                where: { id: meetId },
            });

            if (!meet) {
                throw new HttpException(
                    'meet not found.',
                    HttpStatus.NOT_FOUND,
                );
            }

            const lecture = await this.prisma.lecture.findUnique({
                where: {
                    id: lectureId,
                    meet_id: meetId,
                },
            });

            if (!lecture) {
                throw new HttpException(
                    'This lecture is not registered.',
                    HttpStatus.NOT_FOUND,
                );
            }

            const mailTemplate = (
                await readFile('./src/templates/confirmMeet.hbs')
            ).toString();

            const subject = 'Atualização da situação da palestra.';

            const dynamicVariables = {
                speaker_name: lecture.speaker_name,
                title: lecture.title,
                meet_title: meet.title,
                speaker_about: lecture.speaker_about,
                speaker_linkedin: lecture.speaker_linkedin,
                description: lecture.description,
                datetime: lecture.datetime,
            };

            const mail = compile(mailTemplate)(dynamicVariables);

            await this.mailService.sendMail(
                lecture.speaker_email,
                subject,
                mail,
            );

            await this.prisma.lecture.update({
                data: { status: 'confirmed' },
                where: { id: lectureId, meet_id: meetId },
            });
        } catch (error) {
            console.log(error);
            throw new HttpException(
                'Internal Server Error.',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
