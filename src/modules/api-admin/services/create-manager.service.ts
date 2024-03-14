import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateManagerDto } from 'src/modules/api-manager/dto/manager.dto';
import { sign, verify } from 'jsonwebtoken';
import { Request } from 'express';
import { PrismaService } from 'src/providers/prisma.service';
import { compile } from 'handlebars';
import { readFile } from 'node:fs/promises';
import { MailService } from 'src/providers/mailer.service';

@Injectable()
export class CreateManagerService {
  constructor(
    private prismaService: PrismaService,
    private readonly mailerService: MailService,
  ) {}

  async execute(createManagerDto: CreateManagerDto, req: Request) {
    const { user: admin, ...managerData } = req.body;

    try {
      const managerExists = await this.prismaService.manager.findFirst({
        where: { email: managerData.email },
      });

      if (managerExists) {
        return new HttpException(
          'Manager already exists',
          HttpStatus.BAD_REQUEST,
        );
      }

      const manager = await this.prismaService.manager.create({
        data: {
          ...managerData,
          admin_id: admin.id,
        },
      });

      const token = sign({ manager_id: manager.id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
      });

      const decodedToken = verify(token, process.env.JWT_SECRET);
      let token_expiration_time = new Date(0);

      if (typeof decodedToken !== 'string' && decodedToken.payload) {
        token_expiration_time = new Date(decodedToken.payload.exp * 1000);
      }

      const updatedManager = await this.prismaService.manager.update({
        where: { id: manager.id },
        data: {
          token,
          token_expiration_time,
        },
      });

      const mailTemplate = (
        await readFile('./src/templates/send-manager-registration-data.hbs')
      ).toString();

      const subject = 'Parabéns, você agora pode organizar eventos!';

      const dynamicVariables = {
        manager_name: updatedManager.name,
        token: updatedManager.token,
      };

      const mail = compile(mailTemplate)(dynamicVariables);

      this.mailerService.sendMail(manager.email, subject, mail);

      return updatedManager;
    } catch {
      return new HttpException(
        'Unexpected error on server',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
