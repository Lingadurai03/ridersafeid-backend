import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailerService {
    private transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD,
        },
    });

    async sendMail(to: string, subject: string, html: string) {
        await this.transporter.sendMail({
            from: `"RiderSafe OTP" <${process.env.SMTP_EMAIL}>`,
            to,
            subject,
            html,
        });
    }
}
