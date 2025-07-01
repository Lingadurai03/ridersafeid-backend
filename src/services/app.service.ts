import { Injectable, NotFoundException } from '@nestjs/common';
import { Request } from 'express';

import { ScanLogsApiResponse } from '@/types';

@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello World!';
    }

    async getLogs(id: string, req: Request): Promise<ScanLogsApiResponse> {
        try {
            const res = await fetch(
                `${process.env.QR_SERVICE_BASE_URL}scan/logs/${id}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': process.env.INTERNAL_API_KEY as string,
                        Authorization: req.headers['authorization'] || '',
                    },
                },
            );

            if (!res.ok) {
                throw new Error('Failed to fetch s');
            }

            const data = await res.json();
            return data;
        } catch (err) {
            console.error('Error fetching scan logs:', err);
            throw new NotFoundException();
        }
    }
    async getQrData(id: string) {
        try {
            const res = await fetch(
                `${process.env.QR_SERVICE_BASE_URL}qr/${id}`,
                {
                    method: 'get',
                },
            );
            const data = await res.json();

            return data;
        } catch (_e) {
            throw new NotFoundException();
        }
    }
}
