import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

const desconfirmLectureSchema = z.object({
  reason: z
    .string({ required_error: 'the reason must be a string' })
    .optional(),
});

export class DesconfirmLecture extends createZodDto(desconfirmLectureSchema) {}
