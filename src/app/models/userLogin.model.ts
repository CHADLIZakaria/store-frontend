export interface UserLogin {
    token: string;
}

export interface UserAuth {
    imagePath: string;
    username: string;
    token: string;
    expirationDate: Date
}