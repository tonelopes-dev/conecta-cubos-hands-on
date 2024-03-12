import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma.service';
import { LectureDTO } from './dto/lecture.dto';

@Injectable()
export class LectureCreateService {
  constructor(private prisma: PrismaService) {}

  async createLecture(data: LectureDTO) {
    // Define o status_lecture como 'pending' caso não seja fornecido
    const lectureData = {
      ...data,
      status_lecture: data.status_lecture || 'pending',
    };

    const lecture = await this.prisma.lecture.create({
      data: lectureData,
    });

    return lecture;
  }
}
