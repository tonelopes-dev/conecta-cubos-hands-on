import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import { readFile } from 'fs/promises';
import { compile } from 'handlebars';
import { CreateMeetDto } from 'src/modules/api-manager/dto/meet.dto';
import { MailService } from 'src/providers/mailer.service';
import { PrismaService } from 'src/providers/prisma.service';
import { StorageService } from 'src/providers/storage.service';

@Injectable()
export class CreateMeetService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mailerService: MailService,
    private readonly storageService: StorageService,
  ) {}

  async execute(
    manager_id: string,
    data: CreateMeetDto,
    file?: Express.Multer.File,
  ) {
    try {
      const meetExists = await this.prismaService.meet.findFirst({
        where: { manager_id },
      });

      if (meetExists) {
        return new HttpException(
          'Manager has scheduled meet already',
          HttpStatus.BAD_REQUEST,
        );
      }

      const manager = await this.prismaService.manager.findFirst({
        where: { id: manager_id },
      });

      if (!manager) {
        return new HttpException('Manager not found', HttpStatus.BAD_REQUEST);
      }

      const createdMeet = await this.prismaService.meet.create({
        data: {
          title: data.title,
          summary: data.summary,
          start_time: data.start_time,
          end_time: data.end_time,
          address: data.address,
          address_zip: data.address_zip,
          address_city: data.address_city,
          address_state: data.address_state,
          address_district: data.address_district,
          address_complement: data.address_complement,
          address_number: data.address_number,
          manager_id,
          admin_id: manager.admin_id,
          datetime: new Date(data.datetime),
        },
      });

      let savedImage: ManagedUpload.SendData = null;

      if (file) {
        const key = 'image';

        //multer
        savedImage = await this.storageService.storageImage(
          createdMeet.id,
          key,
          file.buffer,
          file.mimetype,
        );

        await this.prismaService.meet.update({
          where: { id: createdMeet.id },
          data: { image_link: `${savedImage.Location}` },
        });
      }

      const mailTemplate = (
        await readFile('./src/templates/send-manager-meet-data.hbs')
      ).toString();

      const subject = 'Evento criado!';

      const dynamicVariables = {
        manager_name: manager.name,
        title: createdMeet.title,
        token: manager.token,
        id: createdMeet.id,
        datetime: createdMeet.datetime,
        image: savedImage ? `${savedImage.Location}` : null,
      };

      const mail = compile(mailTemplate)(dynamicVariables);

      this.mailerService.sendMail(manager.email, subject, mail);

      return HttpStatus.CREATED;
    } catch (error) {
      console.log(error);
      return new HttpException(
        'Unexpected error:',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
