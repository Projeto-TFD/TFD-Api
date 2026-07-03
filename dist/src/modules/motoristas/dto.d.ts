import { TipoVinculoMotorista } from "@prisma/client";
export declare class CreateMotoristaDto {
    nome: string;
    cpf: string;
    endereco: string;
    renach: string;
    validadeHabilitacao: string;
    tipoHabilitacao: string;
    tipoVinculo: TipoVinculoMotorista;
}
declare const UpdateMotoristaDto_base: import("@nestjs/common").Type<Partial<CreateMotoristaDto>>;
export declare class UpdateMotoristaDto extends UpdateMotoristaDto_base {
}
export {};
