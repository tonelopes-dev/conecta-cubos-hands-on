import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Torna PrismaService disponível para outros módulos
})
export class PrismaModule {}
