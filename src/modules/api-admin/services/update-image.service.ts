import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma.service';
import { StorageService } from 'src/providers/storage.service';

@Injectable()
export class UpdateImageService {
  constructor(
    private prismaService: PrismaService,
    private storageService: StorageService,
  ) {}

  async execute(file: Express.Multer.File, meetId: string) {
    try {
      if (!file) {
        throw new HttpException(
          'File to upload is required.',
          HttpStatus.BAD_REQUEST,
        );
      }

      const meetExist = await this.prismaService.meet.findFirst({
        where: { id: meetId },
      });

      if (!meetExist) {
        throw new HttpException('Meet not found.', HttpStatus.NOT_FOUND);
      }

      if (meetExist.image_link) {
        const path = meetExist.image_link
          .replace(`${process.env.S3_LINK}/`, '')
          .trim();

        await this.storageService.deleteImage(path);
      }

      const key = 'image';

      const savedImage = await this.storageService.storageImage(
        meetExist.id,
        key,
        file.buffer,
        file.mimetype,
      );

      const meetCurrent = await this.prismaService.meet.update({
        where: { id: meetId },
        data: {
          image_link: `${savedImage.Location}`,
          updated_at: new Date(),
        },
      });

      return meetCurrent;
    } catch (error) {
      throw new HttpException(
        'Unexpected Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
