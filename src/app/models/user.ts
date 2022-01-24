export class User {
    id?: number;
    username?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    token?: string;
    refreshToken?: string;
    refreshTokenExpiry?: Date;
    role?: string;
    email?: string;
}