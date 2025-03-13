export interface User {
    id: string;
    username: string;
    email: string;
    first_name?: string | null;
    last_name?: string | null;
    profile_picture?: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    isAuthenticated: boolean;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
}

export interface LoginResponse {
    accessToken: string;
    refreshToken: string;
}

export interface RegisterResponse {
    userId: string;
    message: string;
}

export interface RefreshTokenResponse {
    accessToken: string;
    refreshToken: string;
}

export interface AuthCredentials {
    accessToken: string;
    refreshToken: string;
    user?: User;
}

export interface LogoutResponse {
    message: string;
}

export interface OAuthCallbackParams {
    accessToken: string;
    refreshToken: string;
}