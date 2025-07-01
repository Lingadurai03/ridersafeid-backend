import { Transform } from 'class-transformer';
import { IsEmail } from 'class-validator';

export class RequestOtpDto {
    @IsEmail({}, { message: 'Invalid email format' })
    @Transform(({ value }) => value.trim().toLowerCase())
    email: string;
}
