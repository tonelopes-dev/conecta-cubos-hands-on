import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CreateManagerService } from './services/create-manager.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import {
  CreateManagerDto,
  ManagerIdParamDto,
} from '../api-manager/dto/manager.dto';
import { Request } from 'express';
import { DeactivateManagerService } from './services/deactivate-manager.service';
import { ActivateManagerService } from './services/activate-manager.service';
import { CreateMeetDto, MeetIdParamDto } from '../api-manager/dto/meet.dto';
import { CreateMeetService } from './services/create-meet.service';
import { DeleteMeetService } from './services/delete-meet.service';

@UseGuards(RolesGuard)
@Controller('api-admin')
export class ApiAdminController {
  constructor(
    private readonly createManagerService: CreateManagerService,
    private readonly activateManagerService: ActivateManagerService,
    private readonly deactivateManagerService: DeactivateManagerService,
    private readonly createMeetService: CreateMeetService,
    private readonly deleteMeetService: DeleteMeetService,
  ) {}

  @Roles(['admin'])
  @Post('manager/create')
  createManager(
    @Body() createManagerDto: CreateManagerDto,
    @Req() req: Request,
  ) {
    return this.createManagerService.execute(createManagerDto, req);
  }

  @Roles(['admin'])
  @Post('manager/:id/deactivate')
  deactivateManager(@Param() param: ManagerIdParamDto) {
    return this.deactivateManagerService.execute(param.id);
  }

  @Roles(['admin'])
  @Post('manager/:id/activate')
  activateManager(@Param() param: ManagerIdParamDto) {
    return this.activateManagerService.execute(param.id);
  }

  @Roles(['admin'])
  @Post('meet/create/:id')
  createMeet(
    @Param() param: ManagerIdParamDto,
    @Body() createMeetDto: CreateMeetDto,
    @Req() req: Request,
  ) {
    return this.createMeetService.execute(param.id, createMeetDto, req);
  }

  @Roles(['admin'])
  @Delete('meet/:id/delete')
  remove(@Param() param: MeetIdParamDto) {
    return this.deleteMeetService.execute(param.id);
  }
}