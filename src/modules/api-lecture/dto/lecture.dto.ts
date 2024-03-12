export class LectureDTO {
  meet_id: string;
  speaker_name: string;
  speaker_linkedin: string;
  speaker_email: string;
  speaker_about: string;
  title: string;
  description: string;
  status_lecture: 'pending' | 'confirmed' | 'cancelled';
}
