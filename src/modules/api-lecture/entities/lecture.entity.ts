import { ApiProperty } from '@nestjs/swagger';
// import { LectureStatus } from '../dto/create-lecture.dto';
type Status = 'PENDING' | 'CONFIRMED' | 'CANCELED' | 'FINISHED';

export class Lecture {
  @ApiProperty({
    example: 'uuid',
    description: 'The unique identifier of the Lecture',
  })
  id: string;

  // Este campo não foi exposto na sua versão, considere se deveria ser exposto via API.
  github_id: string;

  access_token: string; // não deve ser exposto via API por questões de segurança.

  @ApiProperty({ example: 'uuid-meet', description: 'Meet ID' })
  meet_id: string;

  @ApiProperty({
    example: 'https://example.com/photo.jpg',
    description: 'Speaker Photo URL',
    required: false,
  })
  speaker_photo_url?: string;

  @ApiProperty({ example: 'José', description: 'The name of the Lecture' })
  speaker_name: string;

  @ApiProperty({
    example: 'https://linkedin.com/in/example',
    description: 'Speaker LinkedIn URL',
    required: false,
  })
  speaker_linkedin?: string;

  @ApiProperty({
    example: 'About the speaker',
    description: 'Brief description about the speaker',
  })
  speaker_about: string;

  @ApiProperty({ example: 'speaker@example.com', description: 'Speaker Email' })
  speaker_email: string;

  @ApiProperty({ example: 'Title of the Lecture', description: 'Title' })
  title: string;

  @ApiProperty({
    example: 'Description of the Lecture',
    description: 'Description',
  })
  description: string;

  @ApiProperty({
    example: '2023-03-19T00:00:00Z',
    description: 'DateTime of the Lecture',
    required: false,
  })
  // Se seu modelo espera um DateTime, você pode precisar tratar essa conversão no seu código.
  @ApiProperty({
    example: 'pending',
    description: 'Status of the Lecture',
    enum: ['pending', 'ongoing', 'cancelled', 'finished'],
  })
  status_lecture: Status;

  // Campos como created_at, updated_at, iscancelled e cancellation_reason não foram incluídos.
  // Considere se eles devem ser expostos pela sua API ou se são apenas para controle interno.
}
