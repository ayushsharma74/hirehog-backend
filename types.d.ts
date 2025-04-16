import type { UserSchema } from "./src/models/user.model";

declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}