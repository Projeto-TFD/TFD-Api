import { CreateUsuarioDto, UpdateUsuarioDto, UpdateUsuarioSenhaDto } from "./dto";
import { UsuariosService } from "./usuarios.service";
export declare class UsuariosController {
    private readonly service;
    constructor(service: UsuariosService);
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
