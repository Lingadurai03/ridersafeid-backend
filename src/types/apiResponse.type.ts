export interface LoginApiResponse {
    user: {
        id: string;
        fullName: string | null;
        email: string;
        role: string;
    };
    accessToken: string;
    refreshToken: string;
}

export type RegisterApiResponse = LoginApiResponse;

export type RefreshTokenApiResponse = Omit<LoginApiResponse, 'user'>;

interface EmergencyContactsType {
    id: string;
    profileId: string;
    name: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date;
}
export interface AddOrUpdateProfileApiResponse {
    id: string;
    userId: string;
    profileName: string;
    bloodGroup: string;
    address: string;
    pincode: string;
    dob: Date;
    state: string;
    city: string;
    imageUrl: string | null;
    showPrivateData: boolean;
    createdAt: Date;
    updatedAt: Date;
    updateCount: number;
    isPremium: boolean;
}

export interface GetProfileApiResponse {
    id: string;
    userId: string;
    profileName: string;
    bloodGroup: string;
    address: string;
    pincode: string;
    dob: Date;
    state: string;
    city: string;
    imageUrl: null | string;
    showPrivateData: boolean;
    createdAt: Date;
    updatedAt: Date;
    emergencyContacts?: EmergencyContactsType[];
}

export interface GetQrApiResponse {
    qrDetails: [
        {
            _id: string;
            userId: string;
            qrCodeUrl: string;
        },
    ];
}

export interface GetAccountDetailsApiResponse {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    phone: string | null;
    fullName: string | null;
    refreshToken: string | null;
    editCount: number;
    role: string;
    qrStatus: boolean;
}

export interface GetRoleApiResponse {
    role: 'admin' | 'user';
}

export interface IpLocation {
    status: string;
    country: string;
    countryCode: string;
    region: string;
    regionName: string;
    city: string;
    zip: string;
    lat: number;
    lon: number;
    timezone: string;
    isp: string;
    org: string;
    as: string;
    query: string;
}

export type IpLocationApiResponse = IpLocation[];

export interface IPAddressApiResponse {
    ip: string;
}

export interface CreateScanLogApiResponse {
    message: string;
    log: {
        ownerUserId: string;
        accuracy: string;
        city: string;
        state: string;
        country: string;
        lat: string;
        long: string;
        _id: string;
        scannedAt: string;
    };
}
export interface ScanLog {
    _id: string;
    ownerUserId: string;
    accuracy: 'poor' | 'accurate';
    city: string;
    state: string;
    country: string;
    lat: string;
    long: string;
    scannedAt: string;
    __v: number;
}

export interface ScanLogsApiResponse {
    logs: ScanLog[];
}

export interface NotificationCountApiReponse {
    count: number;
}

export interface ProfileImageUploadResponseType {
    url: string;
}
