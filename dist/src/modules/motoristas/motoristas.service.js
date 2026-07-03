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
exports.MotoristasService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let MotoristasService = class MotoristasService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(dto) {
        return this.prisma.motorista.create({
            data: { ...dto, validadeHabilitacao: new Date(dto.validadeHabilitacao) },
        });
    }
    findAll({ page, limit }) {
        return this.prisma.motorista.findMany({
            skip: (page - 1) * limit,
            take: limit,
            orderBy: { nome: "asc" },
        });
    }
    async findOne(id) {
        const item = await this.prisma.motorista.findUnique({ where: { id } });
        if (!item)
            throw new common_1.NotFoundException("Motorista não encontrado");
        return item;
    }
    async update(id, dto) {
        await this.findOne(id);
        return this.prisma.motorista.update({
            where: { id },
            data: {
                ...dto,
                validadeHabilitacao: dto.validadeHabilitacao
                    ? new Date(dto.validadeHabilitacao)
                    : undefined,
            },
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.motorista.delete({ where: { id } });
    }
    habilitacoesVencendo(dias = 30) {
        const limite = new Date();
        limite.setDate(limite.getDate() + dias);
        return this.prisma.motorista.findMany({
            where: { validadeHabilitacao: { lte: limite } },
            orderBy: { validadeHabilitacao: "asc" },
        });
    }
};
exports.MotoristasService = MotoristasService;
exports.MotoristasService = MotoristasService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MotoristasService);
//# sourceMappingURL=motoristas.service.js.map