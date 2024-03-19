import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma.service';

@Injectable()
export class LectureFindService {
  constructor(private prisma: PrismaService) {}

  async findLectureById(lectureId: string) {
    const lecture = await this.prisma.lecture.findUnique({
      where: { id: lectureId },
    });
    if (!lecture) {
      throw new NotFoundException('Lecture not found');
    }
    return lecture;
  }
}
