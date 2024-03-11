import { IsNotEmpty, IsUUID } from 'class-validator';

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
