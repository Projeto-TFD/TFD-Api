import { PaginationDto } from "../../common/pagination.dto";
import { CidadesService } from "./cidades.service";
import { CreateCidadeDto, UpdateCidadeDto } from "./dto";
export declare class CidadesController {
    private readonly service;
    constructor(service: CidadesService);
    create(dto: CreateCidadeDto): import("@prisma/client").Prisma.Prisma__CidadeClient<{
        nome: string;
        id: number;
        uf: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(query: PaginationDto): import("@prisma/client").Prisma.PrismaPromise<{
        nome: string;
        id: number;
        uf: string;
    }[]>;
    findOne(id: number): Promise<{
        nome: string;
        id: number;
        uf: string;
    }>;
    update(id: number, dto: UpdateCidadeDto): Promise<{
        nome: string;
        id: number;
        uf: string;
    }>;
    remove(id: number): Promise<{
        nome: string;
        id: number;
        uf: string;
    }>;
}
