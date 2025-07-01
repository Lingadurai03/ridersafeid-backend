import { Transform } from 'class-transformer';
import { IsEmail, IsString, Matches, MinLength } from 'class-validator';

export class LoginDto {
    @IsEmail({}, { message: 'Invalid email format' })
    @Transform(({ value }) => value.trim().toLowerCase())
    email: string;

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
}
