import { PrismaService } from "../prisma/prisma.service";
import { JwtService } from "./jwt.service";
import { PasswordService } from "./password.service";
import { LoginDto } from "./dto";
export declare class AuthService {
    private readonly prisma;
    private readonly jwtService;
    private readonly passwordService;
    constructor(prisma: PrismaService, jwtService: JwtService, passwordService: PasswordService);
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
    private validateCredentials;
    private createLoginResponse;
}
