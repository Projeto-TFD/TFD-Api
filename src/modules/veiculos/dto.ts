import { ApiProperty, PartialType } from '@nestjs/swagger';
import { TipoVeiculo } from '@prisma/client';
import { IsEnum, IsInt, IsString, Length, Max, Min } from 'class-validator';

export class CreateVeiculoDto {
  @IsString() nome: string;
  @IsString() @Length(7, 10) placa: string;
  @IsInt() @Min(1900) @Max(2100) ano: number;
  @IsString() renavam: string;
  @ApiProperty({ enum: TipoVeiculo }) @IsEnum(TipoVeiculo) tipo: TipoVeiculo;
}
export class UpdateVeiculoDto extends PartialType(CreateVeiculoDto) {}
