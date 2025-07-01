import {
    Body,
    Controller,
    Get,
    Post,
    Req,
    Request,
    UseGuards,
} from '@nestjs/common';

import { AddOrUpdateProfileDto } from '@/dto';
import { JwtAuthGuard } from '@/guards';
import { ProfileService } from '@/services';
import {
    AddOrUpdateProfileApiResponse,
    GetAccountDetailsApiResponse,
    GetProfileApiResponse,
} from '@/types';
@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @Post()
    addOrUpdateProfile(
        @Request() req: { user: { id: string } },
        @Body() body: AddOrUpdateProfileDto,
    ): Promise<AddOrUpdateProfileApiResponse> {
        return this.profileService.upsertProfile(req.user.id, body);
    }

    @Get()
    getProfile(
        @Request() req: { user: { id: string } },
    ): Promise<GetProfileApiResponse | null> {
        return this.profileService.getProfile(req.user.id);
    }

    @Get('account-details')
    getAccountDetails(
        @Req() req: { user: { id: string } },
    ): Promise<GetAccountDetailsApiResponse | null> {
        return this.profileService.getAccountdetails(req.user.id);
    }
}
