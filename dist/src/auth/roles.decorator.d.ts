import { AuthenticatedUser } from "./auth.types";
export declare const ROLES_KEY = "roles";
export declare const Roles: (...roles: AuthenticatedUser["role"][]) => import("@nestjs/common").CustomDecorator<string>;
