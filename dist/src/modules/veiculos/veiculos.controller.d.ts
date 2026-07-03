import { PaginationDto } from "../../common/pagination.dto";
import { CreateVeiculoDto, UpdateVeiculoDto } from "./dto";
import { VeiculosService } from "./veiculos.service";
export declare class VeiculosController {
    private readonly service;
    constructor(service: VeiculosService);
    create(dto: CreateVeiculoDto): Promise<{
        nome: string;
        id: number;
        createdAt: Date;
        updatedAt: Date;
        placa: string;
        ano: number;
        renavam: string;
        tipo: import("@prisma/client").$Enums.TipoVeiculo;
    }>;
    findAll(query: PaginationDto): Promise<{
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
    update(id: number, dto: UpdateVeiculoDto): Promise<{
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
