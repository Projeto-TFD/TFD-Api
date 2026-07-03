import { PaginationDto } from "../../common/pagination.dto";
import { CreatePessoaDto, UpdatePessoaDto } from "./dto";
import { PessoasService } from "./pessoas.service";
export declare class PessoasController {
    private readonly service;
    constructor(service: PessoasService);
    create(dto: CreatePessoaDto): import("@prisma/client").Prisma.Prisma__PessoaClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs, import("@prisma/client").Prisma.PrismaClientOptions>;
    findAll(query: PaginationDto): import("@prisma/client").Prisma.PrismaPromise<{
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
    }[]>;
    historico(id: number): Promise<({
        viagem: {
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
        };
    } & {
        id: number;
        viagemId: number;
        pessoaId: number;
        tipoParticipacao: import("@prisma/client").$Enums.TipoParticipacao;
        observacao: string | null;
    })[]>;
    findOne(id: number): Promise<{
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
    }>;
    update(id: number, dto: UpdatePessoaDto): Promise<{
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
    }>;
    remove(id: number): Promise<{
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
    }>;
}
