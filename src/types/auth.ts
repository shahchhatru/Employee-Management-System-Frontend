export interface AuthResponse {
    token: string;
    user: {
      id: string;
      email: string;
    };
  }

export interface LoginParams{
    email:string;
    password:string;
}

export interface SignupParams{
    email:string;
    password1:string;
    password2:string;
}

export interface SignupResponse{
    message:string;
}
