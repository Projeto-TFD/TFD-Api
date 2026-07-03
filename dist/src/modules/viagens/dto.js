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
exports.UpdateViagemDto = exports.CreateViagemDto = exports.ParticipanteViagemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class ParticipanteViagemDto {
}
exports.ParticipanteViagemDto = ParticipanteViagemDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], ParticipanteViagemDto.prototype, "pessoaId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.TipoParticipacao }),
    (0, class_validator_1.IsEnum)(client_1.TipoParticipacao),
    __metadata("design:type", String)
], ParticipanteViagemDto.prototype, "tipoParticipacao", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], ParticipanteViagemDto.prototype, "observacao", void 0);
class CreateViagemDto {
}
exports.CreateViagemDto = CreateViagemDto;
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateViagemDto.prototype, "veiculoId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateViagemDto.prototype, "motoristaId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateViagemDto.prototype, "cidadeOrigemId", void 0);
__decorate([
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CreateViagemDto.prototype, "cidadeDestinoId", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateViagemDto.prototype, "dataSaida", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateViagemDto.prototype, "dataEntrada", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateViagemDto.prototype, "observacao", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => ParticipanteViagemDto),
    __metadata("design:type", Array)
], CreateViagemDto.prototype, "pessoas", void 0);
class UpdateViagemDto extends (0, swagger_1.PartialType)(CreateViagemDto) {
}
exports.UpdateViagemDto = UpdateViagemDto;
//# sourceMappingURL=dto.js.map