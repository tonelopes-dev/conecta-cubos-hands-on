import { Module } from '@nestjs/common';
import { ApiManagerService } from './api-manager.service';
import { ApiManagerController } from './api-manager.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
    controllers: [ApiManagerController],
    providers: [PrismaService, ApiManagerService],
})
export class ApiManagerModule {}
