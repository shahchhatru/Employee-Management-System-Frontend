export interface User {
    _id: string
    name: string
    email: string
    password: string
    role: string
    organizationId: string
    isVerified: boolean
}

export interface UserResponse {
    status: string
    message: string
    data: User[]
}


