import { Module } from '@nestjs/common';

import { PublicController } from '@/controllers';

import { PublicService } from '../services/public.service';
import { ProfileModule } from './profile.module';

@Module({
    imports: [ProfileModule],
    controllers: [PublicController],
    providers: [PublicService],
})
export class PublicModule {}
