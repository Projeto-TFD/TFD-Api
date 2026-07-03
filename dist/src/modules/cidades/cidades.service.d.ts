import { PrismaService } from "../../prisma/prisma.service";
import { PaginationDto } from "../../common/pagination.dto";
import { CreateCidadeDto, UpdateCidadeDto } from "./dto";
export declare class CidadesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateCidadeDto): import("@prisma/client").Prisma.Prisma__CidadeClient<{
        nome: string;
        id: number;
        uf: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll({ page, limit }: PaginationDto): import("@prisma/client").Prisma.PrismaPromise<{
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
