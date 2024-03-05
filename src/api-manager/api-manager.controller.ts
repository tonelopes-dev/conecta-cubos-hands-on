import { Controller, Get, Param } from '@nestjs/common';
import { ApiManagerService } from './api-manager.service';
import { MeetIdParamDto } from './dto/meetDto';
import { ManagerIdParamDto } from './dto/managerDto';

@Controller('api-manager')
export class ApiManagerController {
  constructor(private readonly apiManagerService: ApiManagerService) {}

  @Get('/meet/manager/:id')
  findMeetsByManagerId(@Param() param: ManagerIdParamDto) {
    return this.apiManagerService.findMeetsByManager(param.id);
  }

  @Get('/meet/detail/:id')
  detailMeetById(
    @Param()
    param: MeetIdParamDto,
  ) {
    return this.apiManagerService.detailMeetById(param);
  }
}
