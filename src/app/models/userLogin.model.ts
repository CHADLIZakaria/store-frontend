export interface UserLogin {
    username: string;
    access_token: string;
    imagePath: string;
    isAdmin: boolean,
    expires_in: number
}

export interface UserAuth {
    imagePath: string;
    username: string;
    token: string;
    expirationDate: Date
}