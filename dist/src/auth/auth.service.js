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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const jwt_service_1 = require("./jwt.service");
const password_service_1 = require("./password.service");
let AuthService = class AuthService {
    constructor(prisma, jwtService, passwordService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.passwordService = passwordService;
    }
    async login(dto) {
        const usuario = await this.validateCredentials(dto);
        if (usuario.role !== "OPERADOR") {
            throw new common_1.UnauthorizedException("Credenciais invalidas");
        }
        return this.createLoginResponse(usuario);
    }
    async adminLogin(dto) {
        const usuario = await this.validateCredentials(dto);
        if (usuario.role !== "ADMIN") {
            throw new common_1.UnauthorizedException("Credenciais invalidas");
        }
        return this.createLoginResponse(usuario);
    }
    async validateCredentials(dto) {
        const usuario = await this.prisma.usuario.findUnique({
            where: { email: dto.email.toLowerCase() },
        });
        if (!usuario || !usuario.ativo) {
            throw new common_1.UnauthorizedException("Credenciais invalidas");
        }
        const validPassword = this.passwordService.verify(dto.password, usuario.senhaHash);
        if (!validPassword) {
            throw new common_1.UnauthorizedException("Credenciais invalidas");
        }
        return usuario;
    }
    createLoginResponse(usuario) {
        const token = this.jwtService.sign({
            sub: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            role: usuario.role,
        });
        return {
            ...token,
            tokenType: "Bearer",
            user: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                role: usuario.role,
            },
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_service_1.JwtService,
        password_service_1.PasswordService])
], AuthService);
//# sourceMappingURL=auth.service.js.map