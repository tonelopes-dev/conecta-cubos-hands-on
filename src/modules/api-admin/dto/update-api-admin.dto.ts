import { PartialType } from '@nestjs/mapped-types';
import { CreateApiAdminDto } from './create-api-admin.dto';

export class UpdateApiAdminDto extends PartialType(CreateApiAdminDto) {}
