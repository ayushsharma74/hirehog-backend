
export interface UserSchema {
    googleId: string;
    email: string;
    image: string;
    name: string;
    accessToken: string;
    tokenExpiryDate: Date;
  }

declare global {
    namespace Express {
        interface Request {
            user: UserSchema;
        }
    }
}
