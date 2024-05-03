export interface UserResponse<T> {
    user: T;
    access_token: string;
    refresh_token: string;
}