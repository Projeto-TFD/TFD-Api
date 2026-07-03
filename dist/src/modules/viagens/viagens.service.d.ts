import { PrismaService } from "../../prisma/prisma.service";
import { PaginationDto } from "../../common/pagination.dto";
import { CreateViagemDto, UpdateViagemDto } from "./dto";
export declare class ViagensService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateViagemDto): Promise<{
        veiculo: {
            nome: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            placa: string;
            ano: number;
            renavam: string;
            tipo: import("@prisma/client").$Enums.TipoVeiculo;
        };
        motorista: {
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
        };
        cidadeOrigem: {
            nome: string;
            id: number;
            uf: string;
        };
        cidadeDestino: {
            nome: string;
            id: number;
            uf: string;
        };
        pessoas: ({
            pessoa: {
                nome: string;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                cpf: string | null;
                cartaoSus: string | null;
                dataNascimento: Date | null;
                telefone: string | null;
                endereco: string | null;
                municipio: string | null;
            };
        } & {
            id: number;
            viagemId: number;
            pessoaId: number;
            tipoParticipacao: import("@prisma/client").$Enums.TipoParticipacao;
            observacao: string | null;
        })[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        observacao: string | null;
        dataSaida: Date;
        veiculoId: number;
        motoristaId: number;
        cidadeOrigemId: number;
        cidadeDestinoId: number;
        dataEntrada: Date | null;
    }>;
    findAll({ page, limit }: PaginationDto): import("@prisma/client").Prisma.PrismaPromise<({
        veiculo: {
            nome: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            placa: string;
            ano: number;
            renavam: string;
            tipo: import("@prisma/client").$Enums.TipoVeiculo;
        };
        motorista: {
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
        };
        cidadeOrigem: {
            nome: string;
            id: number;
            uf: string;
        };
        cidadeDestino: {
            nome: string;
            id: number;
            uf: string;
        };
        pessoas: ({
            pessoa: {
                nome: string;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                cpf: string | null;
                cartaoSus: string | null;
                dataNascimento: Date | null;
                telefone: string | null;
                endereco: string | null;
                municipio: string | null;
            };
        } & {
            id: number;
            viagemId: number;
            pessoaId: number;
            tipoParticipacao: import("@prisma/client").$Enums.TipoParticipacao;
            observacao: string | null;
        })[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        observacao: string | null;
        dataSaida: Date;
        veiculoId: number;
        motoristaId: number;
        cidadeOrigemId: number;
        cidadeDestinoId: number;
        dataEntrada: Date | null;
    })[]>;
    findOne(id: number): Promise<{
        veiculo: {
            nome: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            placa: string;
            ano: number;
            renavam: string;
            tipo: import("@prisma/client").$Enums.TipoVeiculo;
        };
        motorista: {
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
        };
        cidadeOrigem: {
            nome: string;
            id: number;
            uf: string;
        };
        cidadeDestino: {
            nome: string;
            id: number;
            uf: string;
        };
        pessoas: ({
            pessoa: {
                nome: string;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                cpf: string | null;
                cartaoSus: string | null;
                dataNascimento: Date | null;
                telefone: string | null;
                endereco: string | null;
                municipio: string | null;
            };
        } & {
            id: number;
            viagemId: number;
            pessoaId: number;
            tipoParticipacao: import("@prisma/client").$Enums.TipoParticipacao;
            observacao: string | null;
        })[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        observacao: string | null;
        dataSaida: Date;
        veiculoId: number;
        motoristaId: number;
        cidadeOrigemId: number;
        cidadeDestinoId: number;
        dataEntrada: Date | null;
    }>;
    update(id: number, dto: UpdateViagemDto): Promise<{
        veiculo: {
            nome: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            placa: string;
            ano: number;
            renavam: string;
            tipo: import("@prisma/client").$Enums.TipoVeiculo;
        };
        motorista: {
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
        };
        cidadeOrigem: {
            nome: string;
            id: number;
            uf: string;
        };
        cidadeDestino: {
            nome: string;
            id: number;
            uf: string;
        };
        pessoas: ({
            pessoa: {
                nome: string;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                cpf: string | null;
                cartaoSus: string | null;
                dataNascimento: Date | null;
                telefone: string | null;
                endereco: string | null;
                municipio: string | null;
            };
        } & {
            id: number;
            viagemId: number;
            pessoaId: number;
            tipoParticipacao: import("@prisma/client").$Enums.TipoParticipacao;
            observacao: string | null;
        })[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        observacao: string | null;
        dataSaida: Date;
        veiculoId: number;
        motoristaId: number;
        cidadeOrigemId: number;
        cidadeDestinoId: number;
        dataEntrada: Date | null;
    }>;
    remove(id: number): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        observacao: string | null;
        dataSaida: Date;
        veiculoId: number;
        motoristaId: number;
        cidadeOrigemId: number;
        cidadeDestinoId: number;
        dataEntrada: Date | null;
    }>;
    porMotorista(motoristaId: number): import("@prisma/client").Prisma.PrismaPromise<({
        veiculo: {
            nome: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            placa: string;
            ano: number;
            renavam: string;
            tipo: import("@prisma/client").$Enums.TipoVeiculo;
        };
        motorista: {
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
        };
        cidadeOrigem: {
            nome: string;
            id: number;
            uf: string;
        };
        cidadeDestino: {
            nome: string;
            id: number;
            uf: string;
        };
        pessoas: ({
            pessoa: {
                nome: string;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                cpf: string | null;
                cartaoSus: string | null;
                dataNascimento: Date | null;
                telefone: string | null;
                endereco: string | null;
                municipio: string | null;
            };
        } & {
            id: number;
            viagemId: number;
            pessoaId: number;
            tipoParticipacao: import("@prisma/client").$Enums.TipoParticipacao;
            observacao: string | null;
        })[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        observacao: string | null;
        dataSaida: Date;
        veiculoId: number;
        motoristaId: number;
        cidadeOrigemId: number;
        cidadeDestinoId: number;
        dataEntrada: Date | null;
    })[]>;
    porVeiculo(veiculoId: number): import("@prisma/client").Prisma.PrismaPromise<({
        veiculo: {
            nome: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            placa: string;
            ano: number;
            renavam: string;
            tipo: import("@prisma/client").$Enums.TipoVeiculo;
        };
        motorista: {
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
        };
        cidadeOrigem: {
            nome: string;
            id: number;
            uf: string;
        };
        cidadeDestino: {
            nome: string;
            id: number;
            uf: string;
        };
        pessoas: ({
            pessoa: {
                nome: string;
                id: number;
                createdAt: Date;
                updatedAt: Date;
                cpf: string | null;
                cartaoSus: string | null;
                dataNascimento: Date | null;
                telefone: string | null;
                endereco: string | null;
                municipio: string | null;
            };
        } & {
            id: number;
            viagemId: number;
            pessoaId: number;
            tipoParticipacao: import("@prisma/client").$Enums.TipoParticipacao;
            observacao: string | null;
        })[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        observacao: string | null;
        dataSaida: Date;
        veiculoId: number;
        motoristaId: number;
        cidadeOrigemId: number;
        cidadeDestinoId: number;
        dataEntrada: Date | null;
    })[]>;
}
