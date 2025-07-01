import { Role } from '@/constant';

export interface JwtPayload {
    email: string;
    sub: string;
    role: Role;
}
