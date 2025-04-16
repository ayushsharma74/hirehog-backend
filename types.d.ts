import type { UserSchema } from "./models/user.model";

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}