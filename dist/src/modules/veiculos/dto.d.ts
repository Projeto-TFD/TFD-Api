import { TipoVeiculo } from "@prisma/client";
export declare class CreateVeiculoDto {
    nome: string;
    placa: string;
    ano: number;
    renavam: string;
    tipo: TipoVeiculo;
}
declare const UpdateVeiculoDto_base: import("@nestjs/common").Type<Partial<CreateVeiculoDto>>;
export declare class UpdateVeiculoDto extends UpdateVeiculoDto_base {
}
export {};
