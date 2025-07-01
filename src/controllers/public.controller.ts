import { Controller, Get, Param } from '@nestjs/common';

import { ProfileService, PublicService } from '@/services';

@Controller('public')
export class PublicController {
    constructor(
        private readonly publicService: PublicService,
        private readonly profileService: ProfileService,
    ) {}

    @Get(':userId')
    getUserProfile(@Param('userId') userId: string) {
        return this.publicService.getProfile(userId);
    }
}
