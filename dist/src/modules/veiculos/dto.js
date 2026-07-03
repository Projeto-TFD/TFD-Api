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
exports.UpdateVeiculoDto = exports.CreateVeiculoDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const class_validator_1 = require("class-validator");
class CreateVeiculoDto {
}
exports.CreateVeiculoDto = CreateVeiculoDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVeiculoDto.prototype, "nome", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(7, 10),
    __metadata("design:type", String)
], CreateVeiculoDto.prototype, "placa", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1900),
    (0, class_validator_1.Max)(2100),
    __metadata("design:type", Number)
], CreateVeiculoDto.prototype, "ano", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateVeiculoDto.prototype, "renavam", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.TipoVeiculo }),
    (0, class_validator_1.IsEnum)(client_1.TipoVeiculo),
    __metadata("design:type", String)
], CreateVeiculoDto.prototype, "tipo", void 0);
class UpdateVeiculoDto extends (0, swagger_1.PartialType)(CreateVeiculoDto) {
}
exports.UpdateVeiculoDto = UpdateVeiculoDto;
//# sourceMappingURL=dto.js.map