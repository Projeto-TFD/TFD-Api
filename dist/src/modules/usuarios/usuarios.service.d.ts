import { PrismaService } from "../../prisma/prisma.service";
import { PasswordService } from "../../auth/password.service";
import { CreateUsuarioDto, UpdateUsuarioDto, UpdateUsuarioSenhaDto } from "./dto";
export declare class UsuariosService {
    private readonly prisma;
    private readonly passwordService;
    constructor(prisma: PrismaService, passwordService: PasswordService);
    create(dto: CreateUsuarioDto): import("@prisma/client").Prisma.Prisma__UsuarioClient<{
        nome: string;
        email: string;
        role: import("@prisma/client").$Enums.RoleUsuario;
        id: number;
        ativo: boolean;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(): import("@prisma/client").Prisma.PrismaPromise<{
        nome: string;
        email: string;
        role: import("@prisma/client").$Enums.RoleUsuario;
        id: number;
        ativo: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: number): Promise<{
        nome: string;
        email: string;
        role: import("@prisma/client").$Enums.RoleUsuario;
        id: number;
        ativo: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: number, dto: UpdateUsuarioDto): Promise<{
        nome: string;
        email: string;
        role: import("@prisma/client").$Enums.RoleUsuario;
        id: number;
        ativo: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateSenha(id: number, dto: UpdateUsuarioSenhaDto): Promise<{
        nome: string;
        email: string;
        role: import("@prisma/client").$Enums.RoleUsuario;
        id: number;
        ativo: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
