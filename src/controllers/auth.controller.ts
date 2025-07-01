import {
    Body,
    Controller,
    Get,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';

import {
    LoginDto,
    RefreshTokenDto,
    RegisterDto,
    RequestOtpDto,
    ValidateOtpDto,
} from '@/dto';
import { JwtAuthGuard } from '@/guards';
import { AuthService } from '@/services';
import {
    LoginApiResponse,
    RefreshTokenApiResponse,
    RegisterApiResponse,
} from '@/types';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    register(@Body() registerData: RegisterDto): Promise<RegisterApiResponse> {
        return this.authService.register(registerData);
    }

    @Post('login')
    login(@Body() loginData: LoginDto): Promise<LoginApiResponse> {
        return this.authService.login(loginData);
    }

    @Post('request-otp')
    requestOtp(@Body() body: RequestOtpDto) {
        return this.authService.requestOtp(body);
    }

    @Post('verify-otp')
    verifyOtp(@Body() body: ValidateOtpDto) {
        return this.authService.verifyOtp(body);
    }

    @Post('refresh')
    async refresh(
        @Body() body: RefreshTokenDto,
    ): Promise<RefreshTokenApiResponse> {
        return this.authService.refreshToken(body);
    }
    @UseGuards(JwtAuthGuard)
    @Get('getRole')
    async getRole(@Request() req: { user: { id: string } }) {
        return this.authService.getRole(req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('self')
    async validate(@Request() req: { user: { id: string } }) {
        return this.authService.getUserInfo(req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get('updateNotificationLastSeenAt')
    async updateNotificationLastSeenAt(
        @Request() req: { user: { id: string } },
    ) {
        const res = await this.authService.updateUserLastSeenNotificationAt(
            req.user.id,
        );
        return { lastSeenNotificationAt: res.lastSeenNotificationAt };
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    async logout(@Request() req: { user: { id: string } }) {
        return this.authService.logout(req.user.id);
    }
}
