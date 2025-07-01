import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from '@/controllers';
import { AuthModule, PublicModule } from '@/modules';
import { AppService } from '@/services';

import { ProfileModule } from './profile.module';
import { UploadModule } from './upload.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env'],
            ignoreEnvFile: process.env.NODE_ENV === 'production',
        }),
        AuthModule,
        ProfileModule,
        PublicModule,
        UploadModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
