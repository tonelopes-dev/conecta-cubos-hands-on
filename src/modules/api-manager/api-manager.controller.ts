import { Body, Controller, Get, Param, Patch, Query } from '@nestjs/common';
import { MeetIdParamDto } from './dto/meetDto';
import { ManagerIdParamDto } from './dto/managerDto';
import { FindMeetsByManagersService } from './services/find-meets-by-manager.service';
import { DetailMeetByIdService } from './services/detail-meet-by-id.service';
import { ConfirmLectureService } from './services/confirm-lecture.service';
import { IParamLecture } from './dto/param-lecture';
import { DesconfirmLectureService } from './services/desconfirm-lecture.service';
import { DesconfirmLecture } from './dto/desconfirm-lecture.dto';
import { ShowLectureService } from './services/show-lecture.service';

@Controller('api-manager')
export class ApiManagerController {
    constructor(
        private readonly findMeetsByManagerService: FindMeetsByManagersService,
        private readonly detailMeetByIdService: DetailMeetByIdService,
        private readonly confirmLectureService: ConfirmLectureService,
        private readonly desconfirmLectureService: DesconfirmLectureService,
        private readonly showLectureService: ShowLectureService,
    ) {}

    @Get('/meet/manager/:id')
    async findMeetsByManagerId(@Param() param: ManagerIdParamDto) {
        return this.findMeetsByManagerService.execute(param.id);
    }

    @Get('/meet/detail/:id')
    async detailMeetById(
        @Param()
        param: MeetIdParamDto,
    ) {
        return this.detailMeetByIdService.execute(param);
    }

    @Patch('/meet/:meetId/lecture/:lectureId/confirm')
    async confirmLecture(@Param() param: IParamLecture) {
        return this.confirmLectureService.execute(
            param.meetId,
            Number(param.lectureId),
        );
    }

    @Patch('/meet/:meetId/lecture/:lectureId/desconfirm')
    async desconfirmLecture(
        @Param() param: IParamLecture,
        @Body() { reason }: DesconfirmLecture,
    ) {
        return this.desconfirmLectureService.execute(
            param.meetId,
            Number(param.lectureId),
            reason,
        );
    }

    @Get('/meet/:meetId/lecture')
    async showLectures(
        @Param() param: IParamLecture,
        @Query('status') status: string,
    ) {
        return this.showLectureService.execute(param.meetId, status);
    }
}
