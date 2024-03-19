import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma.service';
@Injectable()
export class FindMeetsService {
  constructor(private prisma: PrismaService) {}
  async showMeetsService() {
    const events = await this.prisma.meet.findMany();
    if (!events) {
      throw new NotFoundException('Meets not found');
    }
    return events;
  }
}
