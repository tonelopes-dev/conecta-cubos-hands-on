import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/prisma.service';
import { StorageService } from 'src/providers/storage.service';

@Injectable()
export class DeleteMeetService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly storageService: StorageService,
  ) {}

  async execute(id: string) {
    try {
      const meetExists = await this.prismaService.meet.findUnique({
        where: { id },
      });

      if (!meetExists) {
        return new HttpException('Meet not found', HttpStatus.NOT_FOUND);
      }

      await this.prismaService.meet.delete({
        where: { id },
      });

      this.storageService.deleteImage(
        meetExists.image_link.split(
          `${process.env.S3_BUCKET}.${process.env.S3_ENDPOINT}/`,
        )[1],
      );

      return new HttpException('Meet deleted!', HttpStatus.NO_CONTENT);
    } catch (error) {
      console.log(error);
      return new HttpException(
        'Unexpected error!',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
