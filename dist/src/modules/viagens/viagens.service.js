"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViagensService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const includeCompleto = {
    veiculo: true,
    motorista: true,
    cidadeOrigem: true,
    cidadeDestino: true,
    pessoas: { include: { pessoa: true } },
};
let ViagensService = class ViagensService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const saida = new Date(dto.dataSaida);
        const entrada = dto.dataEntrada ? new Date(dto.dataEntrada) : undefined;
        if (entrada && entrada < saida)
            throw new common_1.BadRequestException("Data de entrada não pode ser anterior à saída.");
        return this.prisma.viagem.create({
            data: {
                veiculoId: dto.veiculoId,
                motoristaId: dto.motoristaId,
                cidadeOrigemId: dto.cidadeOrigemId,
                cidadeDestinoId: dto.cidadeDestinoId,
                dataSaida: saida,
                dataEntrada: entrada,
                observacao: dto.observacao,
                pessoas: {
                    create: dto.pessoas.map((p) => ({
                        pessoaId: p.pessoaId,
                        tipoParticipacao: p.tipoParticipacao,
                        observacao: p.observacao,
                    })),
                },
            },
            include: includeCompleto,
        });
    }
    findAll({ page, limit }) {
        return this.prisma.viagem.findMany({
            skip: (page - 1) * limit,
            take: limit,
            include: includeCompleto,
            orderBy: { dataSaida: "desc" },
        });
    }
    async findOne(id) {
        const item = await this.prisma.viagem.findUnique({
            where: { id },
            include: includeCompleto,
        });
        if (!item)
            throw new common_1.NotFoundException("Viagem não encontrada");
        return item;
    }
    async update(id, dto) {
        await this.findOne(id);
        const saida = dto.dataSaida ? new Date(dto.dataSaida) : undefined;
        const entrada = dto.dataEntrada ? new Date(dto.dataEntrada) : undefined;
        if (saida && entrada && entrada < saida)
            throw new common_1.BadRequestException("Data de entrada não pode ser anterior à saída.");
        return this.prisma.$transaction(async (tx) => {
            if (dto.pessoas) {
                await tx.viagemPessoa.deleteMany({ where: { viagemId: id } });
            }
            return tx.viagem.update({
                where: { id },
                data: {
                    veiculoId: dto.veiculoId,
                    motoristaId: dto.motoristaId,
                    cidadeOrigemId: dto.cidadeOrigemId,
                    cidadeDestinoId: dto.cidadeDestinoId,
                    dataSaida: saida,
                    dataEntrada: entrada,
                    observacao: dto.observacao,
                    pessoas: dto.pessoas
                        ? {
                            create: dto.pessoas.map((p) => ({
                                pessoaId: p.pessoaId,
                                tipoParticipacao: p.tipoParticipacao,
                                observacao: p.observacao,
                            })),
                        }
                        : undefined,
                },
                include: includeCompleto,
            });
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.viagem.delete({ where: { id } });
    }
    porMotorista(motoristaId) {
        return this.prisma.viagem.findMany({
            where: { motoristaId },
            include: includeCompleto,
            orderBy: { dataSaida: "desc" },
        });
    }
    porVeiculo(veiculoId) {
        return this.prisma.viagem.findMany({
            where: { veiculoId },
            include: includeCompleto,
            orderBy: { dataSaida: "desc" },
        });
    }
};
exports.ViagensService = ViagensService;
exports.ViagensService = ViagensService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ViagensService);
//# sourceMappingURL=viagens.service.js.map