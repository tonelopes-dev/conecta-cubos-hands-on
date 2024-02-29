import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiManagerService } from './api-manager.service';

@Controller('api-manager')
export class ApiManagerController {
  constructor(private readonly apiManagerService: ApiManagerService) {}

  @Get('/meet/:id')
  findMeetsById(@Param('id') id: string) {
    return this.apiManagerService.findMeetsByManager(id);
  } 
}
