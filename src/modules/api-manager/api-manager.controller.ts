import { Controller, Get, Param } from '@nestjs/common';
import { ApiManagerService } from './api-manager.service';
import { MeetIdParamDto } from './dto/meetDto';
import { ManagerIdParamDto } from './dto/managerDto';
import { FindMeetsByManagersService } from './services/find-meets-by-manager.service';
import { DetailMeetByIdService } from './services/detail-meet-by-id.service';

@Controller('api-manager')
export class ApiManagerController {
    constructor(
        private readonly apiManagerService: ApiManagerService,
        private readonly findMeetsByManagerService: FindMeetsByManagersService,
        private readonly detailMeetByIdService: DetailMeetByIdService,
    ) {}

    @Get('/meet/manager/:id')
    findMeetsByManagerId(@Param() param: ManagerIdParamDto) {
        return this.findMeetsByManagerService.execute(param.id);
    }

    @Get('/meet/detail/:id')
    detailMeetById(
        @Param()
        param: MeetIdParamDto,
    ) {
        return this.detailMeetByIdService.execute(param);
    }
}
