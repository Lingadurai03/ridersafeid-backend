import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
// eslint-disable-next-line @typescript-eslint/no-require-imports
import toStream = require('buffer-to-stream');
import { ProfileImageUploadResponseType } from '@/types';

@Injectable()
export class CloudinaryService {
    async uploadImage(
        file: Express.Multer.File,
    ): Promise<ProfileImageUploadResponseType> {
        // 1. Check if file exists
        if (!file) {
            throw new BadRequestException('No file uploaded');
        }

        // 2. Validate file type (only allow image)
        if (!file.mimetype.startsWith('image/')) {
            throw new BadRequestException('Only image files are allowed');
        }

        // 3. Validate file size (max 1MB)
        const maxSize = 1024 * 1024;
        if (file.size > maxSize) {
            throw new BadRequestException('File too large. Max 5MB allowed');
        }
        try {
            const result = await new Promise<any>((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: 'rider-safe-profile' },
                    (error, result) => {
                        if (error || !result) {
                            return reject(error || new Error('Upload failed'));
                        }
                        resolve(result);
                    },
                );

                toStream(file.buffer).pipe(uploadStream);
            });

            return { url: result.secure_url };
        } catch (err) {
            console.error('Cloudinary Upload Error:', err);
            throw new InternalServerErrorException('Image upload failed');
        }
    }
}
