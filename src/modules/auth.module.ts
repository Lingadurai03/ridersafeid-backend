import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from '@/controllers';
import { AuthService } from '@/services';
import { MailerService } from '@/services/mailer.service';
import { JwtStrategy } from '@/strategy';

import { PrismaModule } from './prisma.module';

@Module({
    imports: [
        ConfigModule,
        PrismaModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('ACCESS_TOKEN_SECRET'),
                signOptions: { expiresIn: '1h' },
            }),
        }),
        PassportModule.register({ defaultStrategy: 'jwt' }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, MailerService],
    exports: [JwtModule, PassportModule],
})
export class AuthModule {}
