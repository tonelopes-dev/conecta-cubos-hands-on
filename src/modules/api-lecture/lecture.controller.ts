import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { LectureFindService } from './lecture-find.service';
import { LectureDTO } from './dto/lecture.dto';
import { LectureCreateService } from './lecture-create.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class LectureController {
  constructor(
    private readonly lectureCreateService: LectureCreateService,
    private readonly lectureFindService: LectureFindService,
  ) {}

  @Post('/meet/:meetId/lecture')
  @UseGuards(AuthGuard('github'))
  async createLecture(
    @Param('meetId') meetId: string,
    @Body() lectureDto: LectureDTO,
  ) {
    lectureDto.meet_id = meetId; // Adiciona o meetId ao DTO
    const lecture = await this.lectureCreateService.createLecture(lectureDto);
    return lecture;
  }

  // Implementação do método GET
  @Get('/meet/:meetId/lecture/:lectureId')
  @UseGuards(AuthGuard('github'))
  async getLectureDetail(
    @Param('meetId') meetId: string,
    @Param('lectureId') lectureId: string,
  ) {
    const lecture = await this.lectureFindService.findLecture(lectureId);
    if (!lecture || lecture.meet_id !== meetId) {
      throw new NotFoundException(
        'Lecture not found or does not belong to the specified meet',
      );
    }
    return lecture;
  }
}
