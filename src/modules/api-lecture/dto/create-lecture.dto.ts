import { IsEnum, IsString, IsDateString } from 'class-validator';

export enum LectureStatus {
  Finished = 'finished',
  Confirmed = 'confirmed',
  Pending = 'pending',
  Cancelled = 'cancelled',
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

  // Use @IsDateString() se `datetime` deve ser uma data ISO 8601 válida.
  // Se espera que seja uma string sem validação de formato específico, mantenha @IsString().
  @IsDateString()
  datetime: string;

  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsEnum(LectureStatus)
  status_lecture: LectureStatus;
}
