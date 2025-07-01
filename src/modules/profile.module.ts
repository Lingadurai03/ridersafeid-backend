import { Module } from '@nestjs/common';

import { ProfileController } from '@/controllers';
import { ProfileService } from '@/services';

import { PrismaModule } from './prisma.module';

@Module({
    imports: [PrismaModule],
    controllers: [ProfileController],
    providers: [ProfileService],
    exports: [ProfileService],
})
export class ProfileModule {}
