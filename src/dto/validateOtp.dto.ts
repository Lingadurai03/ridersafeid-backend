import { Transform } from 'class-transformer';
import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class ValidateOtpDto {
    @IsEmail({}, { message: 'Invalid email format' })
    @Transform(({ value }) => value.trim().toLowerCase())
    email: string;

    @IsString({ message: 'OTP must be a string' })
    @Length(6, 6, { message: 'OTP must be exactly 6 digits' })
    @Matches(/^\d{6}$/, { message: 'OTP must contain only digits' })
    otp: string;
}
