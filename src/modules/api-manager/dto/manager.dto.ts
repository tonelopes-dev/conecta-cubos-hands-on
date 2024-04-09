import { PartialType } from '@nestjs/mapped-types';
import { IsUUID, IsNotEmpty, IsEmail } from 'class-validator';

export class ManagerDto {
  id: string;
  admin_id: string;
  name: string;
  email: string;
  isactive: boolean;
  created_at: Date;
  updated_at: Date;
  token: string;
  token_expiration_time: Date;
  role?: string;
}

export class CreateManagerDto implements Partial<ManagerDto> {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class CreateListManagers {
  @IsNotEmpty()
  managers: CreateManagerDto[];
}

export class ManagerIdParamDto implements Partial<ManagerDto> {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}

export class ManagerTokenAuthorizationDto implements Partial<ManagerDto> {
  @IsNotEmpty()
  token: string;
}

export class UpdateManagerDTO extends PartialType(CreateManagerDto) {}
