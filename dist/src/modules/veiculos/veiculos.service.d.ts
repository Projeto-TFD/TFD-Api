import { PrismaService } from "../../prisma/prisma.service";
import { PaginationDto } from "../../common/pagination.dto";
import { CreateVeiculoDto, UpdateVeiculoDto } from "./dto";
export declare class VeiculosService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateVeiculoDto): Promise<{
        nome: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        placa: string;
        ano: number;
        renavam: string;
        tipo: import("@prisma/client").$Enums.TipoVeiculo;
    }>;
    findAll({ page, limit }: PaginationDto): Promise<{
        nome: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        placa: string;
        ano: number;
        renavam: string;
        tipo: import("@prisma/client").$Enums.TipoVeiculo;
    }[]>;
    findOne(id: number): Promise<{
        nome: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        placa: string;
        ano: number;
        renavam: string;
        tipo: import("@prisma/client").$Enums.TipoVeiculo;
    }>;
    update(id: number, data: UpdateVeiculoDto): Promise<{
        nome: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        placa: string;
        ano: number;
        renavam: string;
        tipo: import("@prisma/client").$Enums.TipoVeiculo;
    }>;
    remove(id: number): Promise<{
        nome: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        placa: string;
        ano: number;
        renavam: string;
        tipo: import("@prisma/client").$Enums.TipoVeiculo;
    }>;
}
