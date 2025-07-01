import { Transform } from 'class-transformer';
import {
    IsEmail,
    IsOptional,
    IsString,
    Matches,
    MinLength,
} from 'class-validator';

export class RegisterDto {
    @IsEmail({}, { message: 'Invalid email format' })
    @Transform(({ value }) => value.trim().toLowerCase())
    email: string;

    @IsOptional()
    @Matches(/^\d{10}$/, { message: 'Phone number must be 10 digits' })
    phone?: string;

    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters long.' })
    @Matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&^()_+=-])[A-Za-z\d@$!%*#?&^()_+=-]{6,}$/,
        {
            message:
                'Password too weak. Must include at least 1 letter, 1 number & 1 special character.',
        },
    )
    password: string;

    @IsString()
    @Transform(({ value }) => value?.trim())
    @Matches(/^[a-zA-Z\s]*$/, {
        message: 'Full name can only contain letters and spaces',
    })
    fullName: string;
}
