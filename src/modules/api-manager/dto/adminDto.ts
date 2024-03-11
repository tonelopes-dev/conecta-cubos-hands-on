import { IsUUID, IsNotEmpty } from 'class-validator';

export class AdminDto {
  id: string;
  username: string;
  email: string;
  token: string;
  role?: string;
}

export class AdminTokenAuthorizationDto implements Partial<AdminDto> {
  @IsNotEmpty()
  token: string;
}
