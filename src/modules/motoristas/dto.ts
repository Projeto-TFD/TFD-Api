import { ApiProperty, PartialType } from '@nestjs/swagger';
import { TipoVinculoMotorista } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsDateString, IsEnum, IsString } from 'class-validator';

export class CreateMotoristaDto {
  @IsString() nome: string;
  @IsString() cpf: string;
  @IsString() endereco: string;
  @IsString() renach: string;
  @IsDateString() validadeHabilitacao: string;
  @IsString() tipoHabilitacao: string;
  @ApiProperty({ enum: TipoVinculoMotorista }) @IsEnum(TipoVinculoMotorista) tipoVinculo: TipoVinculoMotorista;
}
export class UpdateMotoristaDto extends PartialType(CreateMotoristaDto) {}
