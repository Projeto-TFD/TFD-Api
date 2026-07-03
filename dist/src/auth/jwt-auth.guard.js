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
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt_service_1 = require("./jwt.service");
const public_decorator_1 = require("./public.decorator");
const roles_decorator_1 = require("./roles.decorator");
let JwtAuthGuard = class JwtAuthGuard {
    constructor(jwtService, reflector) {
        this.jwtService = jwtService;
        this.reflector = reflector;
    }
    canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(public_decorator_1.IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        const request = context
            .switchToHttp()
            .getRequest();
        const token = this.extractBearerToken(request.header("authorization"));
        if (!token) {
            throw new common_1.UnauthorizedException("Missing bearer token");
        }
        const payload = this.jwtService.verify(token);
        request.user = {
            id: payload.sub,
            nome: payload.nome,
            email: payload.email,
            role: payload.role,
        };
        const roles = this.reflector.getAllAndOverride(roles_decorator_1.ROLES_KEY, [context.getHandler(), context.getClass()]);
        if (roles?.length && !roles.includes(request.user.role)) {
            throw new common_1.ForbiddenException("Acesso negado");
        }
        return true;
    }
    extractBearerToken(authHeader) {
        if (!authHeader) {
            return null;
        }
        const [scheme, token] = authHeader.split(" ");
        return scheme?.toLowerCase() === "bearer" && token ? token : null;
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_service_1.JwtService,
        core_1.Reflector])
], JwtAuthGuard);
//# sourceMappingURL=jwt-auth.guard.js.map