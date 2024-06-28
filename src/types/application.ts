export interface Application {
    text: string;
    type: string;
    user?: string;
    organization?: string;
    supervisor: string;
    status?: string;
    _id?: string;
}

export interface ApplicationTypeReturn {
    text: string;
    type: string;
    user?: User;
    organization: string;
    supervisor?: User;
    status: string;
    _id: string;
}

interface User {
    _id: string;
    name: string;
    email: string;
    role: string;
}

export interface ApplicationResponse {
    status: string;
    data: ApplicationTypeReturn[];
    message: string;
}

