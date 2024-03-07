import { Module } from '@nestjs/common';
import { ApiManagerService } from './api-manager.service';
import { ApiManagerController } from './api-manager.controller';
import { PrismaService } from 'src/prisma.service';
import { FindMeetsByManagersService } from './services/find-meets-by-manager.service';
import { DetailMeetByIdService } from './services/detail-meet-by-id.service';

@Module({
    controllers: [ApiManagerController],
    providers: [
        PrismaService,
        ApiManagerService,
        FindMeetsByManagersService,
        DetailMeetByIdService,
    ],
})
export class ApiManagerModule {}
