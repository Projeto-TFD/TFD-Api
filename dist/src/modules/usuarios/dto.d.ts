export declare enum UsuarioRoleDto {
    ADMIN = "ADMIN",
    OPERADOR = "OPERADOR"
}
export declare class CreateUsuarioDto {
    nome: string;
    email: string;
    password: string;
    role?: UsuarioRoleDto;
}
declare const UpdateUsuarioDto_base: import("@nestjs/common").Type<Partial<CreateUsuarioDto>>;
export declare class UpdateUsuarioDto extends UpdateUsuarioDto_base {
    ativo?: boolean;
}
export declare class UpdateUsuarioSenhaDto {
    password: string;
}
export {};
