"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaErrorFilter = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
let PrismaErrorFilter = class PrismaErrorFilter {
    catch(exception, host) {
        const response = host.switchToHttp().getResponse();
        if (exception.code === "P2002")
            throw new common_1.ConflictException("Registro duplicado em campo único.");
        if (exception.code === "P2025")
            throw new common_1.NotFoundException("Registro não encontrado.");
        response
            .status(400)
            .json({ message: exception.message, code: exception.code });
    }
};
exports.PrismaErrorFilter = PrismaErrorFilter;
exports.PrismaErrorFilter = PrismaErrorFilter = __decorate([
    (0, common_1.Catch)(client_1.Prisma.PrismaClientKnownRequestError)
], PrismaErrorFilter);
//# sourceMappingURL=prisma-error.filter.js.map