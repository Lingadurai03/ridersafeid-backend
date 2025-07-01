import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';

import { GetProfileApiResponse } from '@/types';

import { PrismaService } from './prisma.service';

@Injectable()
export class PublicService {
    constructor(private readonly prisma: PrismaService) {}

    async getProfile(id: string) {
        try {
            const userProfile = await this.prisma.profile.findUnique({
                where: { userId: id },
            });

            if (!userProfile) {
                throw new NotFoundException('Profile not found');
            }

            // If private data should not be shown, exclude emergencyContacts
            const response = { ...userProfile } as GetProfileApiResponse;

            if (userProfile.showPrivateData) {
                const emergencyContacts =
                    await this.prisma.emergencyContact.findMany({
                        where: { profileId: userProfile.id },
                    });
                response.emergencyContacts = emergencyContacts;
            } else {
                response.emergencyContacts = [];
            }

            return response;
        } catch (_error) {
            throw new InternalServerErrorException('Failed to fetch profile');
        }
    }
}
