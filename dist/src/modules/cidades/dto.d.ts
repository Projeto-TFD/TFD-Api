export declare class CreateCidadeDto {
    nome: string;
    uf: string;
}
declare const UpdateCidadeDto_base: import("@nestjs/common").Type<Partial<CreateCidadeDto>>;
export declare class UpdateCidadeDto extends UpdateCidadeDto_base {
}
export {};
