export interface Profile {
    _id?: string;
    firstname?: string;
    lastname?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    state?: string;
    zip?: string;
    says?: string;
    image?: string;
    user?: User;

}

export interface User {
    _id: string
    name: string
    email: string
    password: string
    role: string
    organizationId: string
    isVerified: boolean
    verifiedAt: string
    verificationExpiresAt: any
    createdAt: string
    updatedAt: string
    __v: number
}

export interface ProfileResponse {
    status: string;
    message: string;
    data: Profile[];

}