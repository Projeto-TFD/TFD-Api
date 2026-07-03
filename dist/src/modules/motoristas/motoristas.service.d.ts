import { PrismaService } from "../../prisma/prisma.service";
import { PaginationDto } from "../../common/pagination.dto";
import { CreateMotoristaDto, UpdateMotoristaDto } from "./dto";
export declare class MotoristasService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateMotoristaDto): import("@prisma/client").Prisma.Prisma__MotoristaClient<{
        nome: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        cpf: string;
        endereco: string;
        renach: string;
        validadeHabilitacao: Date;
        tipoHabilitacao: string;
        tipoVinculo: import("@prisma/client").$Enums.TipoVinculoMotorista;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll({ page, limit }: PaginationDto): import("@prisma/client").Prisma.PrismaPromise<{
        nome: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        cpf: string;
        endereco: string;
        renach: string;
        validadeHabilitacao: Date;
        tipoHabilitacao: string;
        tipoVinculo: import("@prisma/client").$Enums.TipoVinculoMotorista;
    }[]>;
    findOne(id: number): Promise<{
        nome: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        cpf: string;
        endereco: string;
        renach: string;
        validadeHabilitacao: Date;
        tipoHabilitacao: string;
        tipoVinculo: import("@prisma/client").$Enums.TipoVinculoMotorista;
    }>;
    update(id: number, dto: UpdateMotoristaDto): Promise<{
        nome: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        cpf: string;
        endereco: string;
        renach: string;
        validadeHabilitacao: Date;
        tipoHabilitacao: string;
        tipoVinculo: import("@prisma/client").$Enums.TipoVinculoMotorista;
    }>;
    remove(id: number): Promise<{
        nome: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        cpf: string;
        endereco: string;
        renach: string;
        validadeHabilitacao: Date;
        tipoHabilitacao: string;
        tipoVinculo: import("@prisma/client").$Enums.TipoVinculoMotorista;
    }>;
    habilitacoesVencendo(dias?: number): import("@prisma/client").Prisma.PrismaPromise<{
        nome: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        cpf: string;
        endereco: string;
        renach: string;
        validadeHabilitacao: Date;
        tipoHabilitacao: string;
        tipoVinculo: import("@prisma/client").$Enums.TipoVinculoMotorista;
    }[]>;
}
