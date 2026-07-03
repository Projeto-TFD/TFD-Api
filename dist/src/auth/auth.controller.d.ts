import { AuthenticatedUser } from "./auth.types";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(dto: LoginDto): Promise<{
        tokenType: string;
        user: {
            id: number;
            nome: string;
            email: string;
            role: import("@prisma/client").$Enums.RoleUsuario;
        };
        accessToken: string;
        expiresIn: number;
    }>;
    adminLogin(dto: LoginDto): Promise<{
        tokenType: string;
        user: {
            id: number;
            nome: string;
            email: string;
            role: import("@prisma/client").$Enums.RoleUsuario;
        };
        accessToken: string;
        expiresIn: number;
    }>;
    me(user: AuthenticatedUser): AuthenticatedUser;
}
