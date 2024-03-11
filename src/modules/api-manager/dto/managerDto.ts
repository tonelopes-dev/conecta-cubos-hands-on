import { PickType } from '@nestjs/mapped-types';
import { IsUUID, IsNotEmpty } from 'class-validator';

export class ManagerDto {
    id: string;
    admin_id: string;
    name: string;
    email: string;
    isActive: boolean;
    created_at: Date;
    updated_at: Date;
    token: string;
    token_expiration_time: Date;
}

export class CreateManagerDto extends PickType(ManagerDto, [
    'name',
    'email',
    'admin_id',
] as const) {}

export class ManagerIdParamDto implements Partial<ManagerDto> {
    @IsUUID()
    @IsNotEmpty()
    id: string;
}
