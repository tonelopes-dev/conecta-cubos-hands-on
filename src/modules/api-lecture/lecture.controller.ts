import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  UseGuards,
  NotFoundException,
  UnauthorizedException,
  Req,
  Delete,
  Patch,
  Request,
  Render,
} from '@nestjs/common';

import { AuthGuard } from '@nestjs/passport';
import { CreateLectureDTO } from './dto/create-lecture.dto';
import { LectureFindService } from './services/lecture-find.service';
import { LectureCreateService } from './services/lecture-create.service';
import { LectureCanceledService } from './services/lecture-canceled.service';
import { FindMeetsService } from './services/show-events.service';

@Controller('meet')
export class LectureController {
  constructor(
    private readonly lectureCreateService: LectureCreateService,
    private readonly lectureFindService: LectureFindService,
    private readonly lectureCanceledService: LectureCanceledService,
    private readonly findMeetsService: FindMeetsService,
  ) {}

  @Post('/:meetId/lecture')
  @UseGuards(AuthGuard('github')) // Ative a guarda de autenticação conforme necessário
  async createLecture(
    @Param('meetId') meetId: string,
    @Body() lectureDto: CreateLectureDTO,
    @Req() req: any, // Use any para simplificar o acesso ao req.user; considere usar uma interface adequada
  ) {
    if (!req.user) {
      throw new UnauthorizedException();
    }

    const userData = {
      githubId: req.user.githubId,
      speakerPhotoUrl: req.user.photoUrl,
    };

    const lecture = await this.lectureCreateService.createLecture(
      lectureDto,
      meetId,
      userData,
    );
    return lecture;
  }

  @Get('/:meetId/lecture/:lectureId')
  async getLectureDetail(
    @Param('meetId') meetId: string,
    @Param('lectureId') lectureId: string,
  ) {
    const lecture = await this.lectureFindService.findLectureById(lectureId);
    if (!lecture || lecture.meet_id !== meetId) {
      throw new NotFoundException('Lecture not found.');
    }

    return lecture;
  }

  @Patch('/:meetId/lecture/:lectureId')
  async canceledLecture(
    @Param('meetId') meetId: string,
    @Param('lectureId') lectureId: string,
  ) {
    const lecture = await this.lectureCanceledService.canceledLecture(
      meetId,
      lectureId,
    );
    return lecture;
  }

  @Get()
  @Render('events/events')
  async showEvents() {
    const showEvents = await this.findMeetsService.showMeetsService();
    console.log(showEvents);
    return {
      nome: 'Bem vindo(a) a lista de eventos da CumuniCubos',
      events: showEvents,
    };
  }
}
