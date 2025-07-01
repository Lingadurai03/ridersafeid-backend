import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { AddOrUpdateProfileApiPayload } from '@/types';

import { PrismaService } from './prisma.service';

@Injectable()
export class ProfileService {
    constructor(private readonly prisma: PrismaService) {}

    async upsertProfile(userId: string, dto: AddOrUpdateProfileApiPayload) {
        const { emergencyContacts, ...profileData } = dto;

        const existingProfile = await this.prisma.profile.findUnique({
            where: { userId },
        });

        if (existingProfile) {
            // if (!existingProfile.isPremium && existingProfile.updateCount >= 3) {
            //   throw new ForbiddenException(
            //     'Update limit reached. Please upgrade to premium.',
            //   );
            // }

            const updatedProfile = await this.prisma.profile.update({
                where: { userId },
                data: {
                    ...profileData,
                    dob: new Date(profileData.dob).toISOString(),
                    updateCount: existingProfile.updateCount + 1,
                },
            });

            if (emergencyContacts) {
                await this.prisma.emergencyContact.deleteMany({
                    where: { profileId: updatedProfile.id },
                });

                await this.prisma.emergencyContact.createMany({
                    data: emergencyContacts.map((contact) => ({
                        profileId: updatedProfile.id,
                        ...contact,
                    })),
                });
            }

            return updatedProfile;
        } else {
            // First time creating profile
            await this.prisma.user.update({
                where: { id: userId },
                data: { qrStatus: true },
            });

            return this.prisma.profile.create({
                data: {
                    ...profileData,
                    dob: new Date(profileData.dob).toISOString(),
                    userId,
                    emergencyContacts: emergencyContacts
                        ? { create: emergencyContacts }
                        : undefined,
                },
                include: { emergencyContacts: true },
            });
        }
    }

    async getProfile(id: string) {
        try {
            const userProfile = await this.prisma.profile.findUnique({
                where: { userId: id },
                include: { emergencyContacts: true },
            });

            return userProfile;
        } catch (_error) {
            throw new InternalServerErrorException('Failed to fetch profile');
        }
    }

    async getAccountdetails(id: string) {
        try {
            const userProfile = await this.prisma.user.findUnique({
                where: { id },
                omit: { password: true },
            });

            return userProfile;
        } catch (_error) {
            throw new InternalServerErrorException('Failed to fetch profile');
        }
    }
}
