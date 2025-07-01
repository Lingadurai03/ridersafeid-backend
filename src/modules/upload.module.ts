import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

import { UploadController } from '@/controllers';
import { CloudinaryProvider } from '@/provider';
import { CloudinaryService } from '@/services';

@Module({
    imports: [
        MulterModule.register({
            limits: {
                fileSize: 5 * 1024 * 1024,
            },
        }),
    ],
    controllers: [UploadController],
    providers: [CloudinaryProvider, CloudinaryService],
})
export class UploadModule {}
