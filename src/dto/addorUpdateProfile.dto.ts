import { Type } from 'class-transformer';
import {
    ArrayMaxSize,
    IsBoolean,
    IsDateString,
    IsOptional,
    IsString,
    Length,
    Matches,
    ValidateNested,
} from 'class-validator';

export class EmergencyContactDto {
    @IsString({ message: 'Contact name must be a string' })
    @Length(2, 50, {
        message: 'Contact name must be between 2 and 50 characters',
    })
    name: string;

    @IsString({ message: 'Phone number must be a string' })
    @Matches(/^\d{10}$/, { message: 'Phone number must be exactly 10 digits' })
    phone: string;
}

export class AddOrUpdateProfileDto {
    @IsString()
    profileName: string;

    @IsString()
    bloodGroup: string;

    @IsString()
    address: string;

    @IsString()
    pincode: string;

    @IsDateString()
    dob: string;

    @IsString()
    state: string;

    @IsString()
    city: string;

    @IsOptional()
    @IsString()
    imageUrl?: string;

    @IsOptional()
    @IsBoolean()
    showPrivateData?: boolean;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => EmergencyContactDto)
    @ArrayMaxSize(3, {
        message: 'A maximum of 3 emergency contacts is allowed',
    })
    emergencyContacts?: EmergencyContactDto[];
}
