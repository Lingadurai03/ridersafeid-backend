import {
    Controller,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { JwtAuthGuard } from '@/guards';
import { CloudinaryService } from '@/services';

@Controller('upload')
@UseGuards(JwtAuthGuard)
export class UploadController {
    constructor(private readonly cloudinaryService: CloudinaryService) {}

    @Post('profile-image')
    @UseInterceptors(FileInterceptor('file'))
    async uploadProfile(@UploadedFile() file: Express.Multer.File) {
        return this.cloudinaryService.uploadImage(file);
    }
}
