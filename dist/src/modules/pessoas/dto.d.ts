export declare class CreatePessoaDto {
    nome: string;
    cpf?: string;
    cartaoSus?: string;
    dataNascimento?: string;
    telefone?: string;
    endereco?: string;
    municipio?: string;
}
declare const UpdatePessoaDto_base: import("@nestjs/common").Type<Partial<CreatePessoaDto>>;
export declare class UpdatePessoaDto extends UpdatePessoaDto_base {
}
export {};
