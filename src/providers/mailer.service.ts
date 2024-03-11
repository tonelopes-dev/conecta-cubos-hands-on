import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private mailer: MailerService) {}

  async sendMail(email: string, subject: string, mailTemplate: string) {
    await this.mailer.sendMail({
      to: email,
      subject,
      html: mailTemplate,
    });
  }
}
