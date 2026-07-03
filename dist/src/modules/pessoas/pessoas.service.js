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
exports.PessoasService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PessoasService = class PessoasService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(dto) {
        return this.prisma.pessoa.create({
            data: {
                ...dto,
                dataNascimento: dto.dataNascimento
                    ? new Date(dto.dataNascimento)
                    : undefined,
            },
        });
    }
    findAll({ page, limit }) {
        return this.prisma.pessoa.findMany({
            skip: (page - 1) * limit,
            take: limit,
            orderBy: { nome: "asc" },
        });
    }
    async findOne(id) {
        const item = await this.prisma.pessoa.findUnique({ where: { id } });
        if (!item)
            throw new common_1.NotFoundException("Pessoa não encontrada");
        return item;
    }
    async historico(id) {
        await this.findOne(id);
        return this.prisma.viagemPessoa.findMany({
            where: { pessoaId: id },
            include: {
                viagem: {
                    include: {
                        motorista: true,
                        veiculo: true,
                        cidadeOrigem: true,
                        cidadeDestino: true,
                    },
                },
            },
            orderBy: { viagem: { dataSaida: "desc" } },
        });
    }
    async update(id, dto) {
        await this.findOne(id);
        return this.prisma.pessoa.update({
            where: { id },
            data: {
                ...dto,
                dataNascimento: dto.dataNascimento
                    ? new Date(dto.dataNascimento)
                    : undefined,
            },
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.pessoa.delete({ where: { id } });
    }
};
exports.PessoasService = PessoasService;
exports.PessoasService = PessoasService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PessoasService);
//# sourceMappingURL=pessoas.service.js.map