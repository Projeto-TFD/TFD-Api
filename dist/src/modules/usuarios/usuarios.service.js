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
exports.UsuariosService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const password_service_1 = require("../../auth/password.service");
const usuarioSelect = {
    id: true,
    nome: true,
    email: true,
    role: true,
    ativo: true,
    createdAt: true,
    updatedAt: true,
};
let UsuariosService = class UsuariosService {
    constructor(prisma, passwordService) {
        this.prisma = prisma;
        this.passwordService = passwordService;
    }
    create(dto) {
        return this.prisma.usuario.create({
            data: {
                nome: dto.nome,
                email: dto.email.toLowerCase(),
                senhaHash: this.passwordService.hash(dto.password),
                role: dto.role ?? "OPERADOR",
            },
            select: usuarioSelect,
        });
    }
    findAll() {
        return this.prisma.usuario.findMany({
            orderBy: { nome: "asc" },
            select: usuarioSelect,
        });
    }
    async findOne(id) {
        const usuario = await this.prisma.usuario.findUnique({
            where: { id },
            select: usuarioSelect,
        });
        if (!usuario) {
            throw new common_1.NotFoundException("Usuario nao encontrado");
        }
        return usuario;
    }
    async update(id, dto) {
        await this.findOne(id);
        return this.prisma.usuario.update({
            where: { id },
            data: {
                nome: dto.nome,
                email: dto.email?.toLowerCase(),
                role: dto.role,
                ativo: dto.ativo,
                senhaHash: dto.password
                    ? this.passwordService.hash(dto.password)
                    : undefined,
            },
            select: usuarioSelect,
        });
    }
    async updateSenha(id, dto) {
        await this.findOne(id);
        return this.prisma.usuario.update({
            where: { id },
            data: {
                senhaHash: this.passwordService.hash(dto.password),
            },
            select: usuarioSelect,
        });
    }
};
exports.UsuariosService = UsuariosService;
exports.UsuariosService = UsuariosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        password_service_1.PasswordService])
], UsuariosService);
//# sourceMappingURL=usuarios.service.js.map