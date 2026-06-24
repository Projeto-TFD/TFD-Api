import { PartialType } from "@nestjs/swagger";
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";

export enum UsuarioRoleDto {
  ADMIN = "ADMIN",
  OPERADOR = "OPERADOR",
}

export class CreateUsuarioDto {
  @IsString()
  nome: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsOptional()
  @IsEnum(UsuarioRoleDto)
  role?: UsuarioRoleDto;
}

export class UpdateUsuarioDto extends PartialType(CreateUsuarioDto) {
  @IsOptional()
  @IsBoolean()
  ativo?: boolean;
}

export class UpdateUsuarioSenhaDto {
  @IsString()
  @MinLength(8)
  password: string;
}
