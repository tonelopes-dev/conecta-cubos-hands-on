import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class MeetDto {
  id: string;
  admin_id: string;
  title: string;
  summary: string;
  date: Date;
  link: string;
  image_link: string;
  address: string;
  address_number: string;
  address_zip: string;
  address_city: string;
  address_state: string;
  address_district: string;
  address_complement: string;
  start_time: Date;
  end_time: Date;
  created_at: Date;
  updated_at: Date;
}

export class MeetIdParamDto implements Partial<MeetDto> {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}

export class CreateMeetDto implements Partial<MeetDto> {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  summary: string;

  @IsNotEmpty()
  datetime: Date;

  @IsOptional()
  link?: string;

  @IsOptional()
  image_link?: string;

  @IsNotEmpty()
  address: string;

  @IsOptional()
  address_number?: string;

  @IsNotEmpty()
  address_zip: string;

  @IsNotEmpty()
  address_city: string;

  @IsNotEmpty()
  address_state: string;

  @IsNotEmpty()
  address_district: string;

  @IsNotEmpty()
  address_complement: string;

  @IsNotEmpty()
  start_time: Date;

  @IsNotEmpty()
  end_time?: Date;
}
