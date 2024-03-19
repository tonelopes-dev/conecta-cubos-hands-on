import { IsEnum, IsString } from 'class-validator';
export enum LectureStatus {
  Canceled = 'canceled',
  Pending = 'pending',
  Confirmed = 'confirmed',
  Finished = 'finished',
}

export class CreateLectureDTO {
  @IsString()
  speaker_name: string;

  @IsString()
  speaker_linkedin: string;

  @IsString()
  speaker_email: string;

  @IsString()
  speaker_about: string;

  datetime: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(LectureStatus)
  status_lecture: LectureStatus;
}
