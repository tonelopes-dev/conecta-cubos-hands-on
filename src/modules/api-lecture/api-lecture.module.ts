import { Module } from '@nestjs/common'; // Ajuste o caminho conforme necessário
import { LectureController } from './lecture.controller';
import { LectureFindService } from './services/lecture-find.service';
import { LectureCreateService } from './services/lecture-create.service';
import { PrismaModule } from 'src/providers/prisma.module';
import { MailService } from 'src/providers/mailer.service';
import { LectureCanceledService } from './services/lecture-canceled.service';
import { AuthGihubModule } from 'src/auth/github/auth-github.module';
import { FindMeetsService } from './services/show-events.service';

@Module({
  imports: [PrismaModule], // Importe o PrismaModule aqui
  controllers: [LectureController],
  providers: [
    LectureCreateService,
    LectureFindService,
    LectureCanceledService,
    MailService,
    AuthGihubModule,
    FindMeetsService,
  ],
})
export class ApiLectureModule {}
