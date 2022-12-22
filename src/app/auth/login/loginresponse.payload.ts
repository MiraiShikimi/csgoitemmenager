export interface LoginResponse{
    roles: string[];
    authenticationToken: string;
    refreshToken: string;
    username: string;
    pictureUrl: string;
}