import { TipoParticipacao } from "@prisma/client";
export declare class ParticipanteViagemDto {
    pessoaId: number;
    tipoParticipacao: TipoParticipacao;
    observacao?: string;
}
export declare class CreateViagemDto {
    veiculoId: number;
    motoristaId: number;
    cidadeOrigemId: number;
    cidadeDestinoId: number;
    dataSaida: string;
    dataEntrada?: string;
    observacao?: string;
    pessoas: ParticipanteViagemDto[];
}
declare const UpdateViagemDto_base: import("@nestjs/common").Type<Partial<CreateViagemDto>>;
export declare class UpdateViagemDto extends UpdateViagemDto_base {
}
export {};
