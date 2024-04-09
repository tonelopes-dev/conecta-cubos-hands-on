import {
  Controller,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Put,
  Get,
  Request,
  Query,
} from '@nestjs/common';
import { CreateManagerService } from './services/create-manager.service';
import { Roles } from 'src/auth/auth-jwt/roles.decorator';
import { RolesGuard } from 'src/auth/auth-jwt/roles.guard';
import {
  CreateListManagers,
  CreateManagerDto,
  ManagerIdParamDto,
  UpdateManagerDTO,
} from '../api-manager/dto/manager.dto';
import { DeactivateManagerService } from './services/deactivate-manager.service';
import { ActivateManagerService } from './services/activate-manager.service';
import {
  CreateMeetDto,
  MeetIdParamDto,
  UpdateMeetDTO,
} from '../api-manager/dto/meet.dto';
import { CreateMeetService } from './services/create-meet.service';
import { DeleteMeetService } from './services/delete-meet.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateManagersService } from './services/create-list-managers.service';
import { DeleteManagerService } from './services/delete-manager.service';
import { UpdateManagerService } from './services/update-manager.service';
import { FindMeetsService } from './services/findMeets.service';
import { UpdateImageService } from './services/update-image.service';
import { IQueryParams } from './dto/query-param-meet.dto';
import { UpdateMeetService } from './services/update-meet.service';

@UseGuards(RolesGuard)
@Controller('api-admin')
export class ApiAdminController {
  constructor(
    private readonly createManagerService: CreateManagerService,
    private readonly activateManagerService: ActivateManagerService,
    private readonly deactivateManagerService: DeactivateManagerService,
    private readonly createMeetService: CreateMeetService,
    private readonly deleteMeetService: DeleteMeetService,
    private readonly createListOfManagersService: CreateManagersService,
    private readonly deleteManagerService: DeleteManagerService,
    private readonly updateManagerService: UpdateManagerService,
    private readonly findMeetsService: FindMeetsService,
    private readonly updateImageService: UpdateImageService,
    private readonly updateMeetService: UpdateMeetService,
  ) {}

  // Meet

  @Roles(['admin'])
  @Post('meet/create/:id')
  createMeet(
    @Param() param: ManagerIdParamDto,
    @Body() createMeetDto: CreateMeetDto,
  ) {
    return this.createMeetService.execute(param.id, createMeetDto);
  }

  @Roles(['admin'])
  @Delete('meet/:id/delete')
  removeMeet(@Param() param: MeetIdParamDto) {
    return this.deleteMeetService.execute(param.id);
  }

  @Get('meet')
  findMeets(@Query() query: IQueryParams) {
    return this.findMeetsService.execute({ ...query });
  }

  @Roles(['admin'])
  @Put('meet/:id/image')
  @UseInterceptors(FileInterceptor('image'))
  updateImageMeet(
    @Param() param: MeetIdParamDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.updateImageService.execute(file, param.id);
  }

  @Roles(['admin'])
  @Put('meet/:id/update')
  updateMeet(
    @Param() param: MeetIdParamDto,
    @Body() data: UpdateMeetDTO,
    @Request() req,
  ) {
    return this.updateMeetService.execute(param.id, req.user.id, data);
  }

  // Manager

  @Roles(['admin'])
  @Post('manager/create')
  createManager(@Body() createManagerDto: CreateManagerDto, @Request() req) {
    return this.createManagerService.execute(createManagerDto, req.user.id);
  }

  @Roles(['admin'])
  @Post('manager/create-many')
  createListOfManagers(
    @Body() createManagerDto: CreateListManagers,
    @Request() req,
  ) {
    return this.createListOfManagersService.execute(
      createManagerDto,
      req.user.id,
    );
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
  @Delete('manager/:id/delete')
  removeManager(@Param() param: ManagerIdParamDto) {
    return this.deleteManagerService.execute(param.id);
  }

  @Roles(['admin'])
  @Put('manager/:id/update')
  updateManager(
    @Param() param: ManagerIdParamDto,
    @Body() updateManager: UpdateManagerDTO,
  ) {
    return this.updateManagerService.execute(param.id, {
      ...updateManager,
    });
  }
}
