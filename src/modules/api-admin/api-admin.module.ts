import { Module } from '@nestjs/common';
import { CreateManagerService } from './services/create-manager.service';
import { ApiAdminController } from './api-admin.controller';
import { PrismaService } from 'src/providers/prisma.service';
import { DeactivateManagerService } from './services/deactivate-manager.service';
import { ActivateManagerService } from './services/activate-manager.service';
import { CreateMeetService } from './services/create-meet.service';
import { MailService } from 'src/providers/mailer.service';
import { DeleteMeetService } from './services/delete-meet.service';

@Module({
  controllers: [ApiAdminController],
  providers: [
    PrismaService,
    MailService,
    CreateManagerService,
    ActivateManagerService,
    DeactivateManagerService,
    CreateMeetService,
    DeleteMeetService,
  ],
})
export class ApiAdminModule {}
