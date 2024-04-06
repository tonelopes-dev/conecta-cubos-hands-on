// import { LectureStatus } from '../dto/create-lecture.dto';
type Status = 'PENDING' | 'CONFIRMED' | 'CANCELED' | 'FINISHED';

export class Lecture {
  id: string;

  github_id: string;

  access_token: string; // não deve ser exposto via API por questões de segurança.

  meet_id: string;

  speaker_photo_url?: string;

  speaker_name: string;

  speaker_linkedin?: string;

  speaker_about: string;

  speaker_email: string;

  title: string;

  description: string;

  status_lecture: Status;
}
