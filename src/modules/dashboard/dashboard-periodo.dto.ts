import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsDateString, IsOptional } from "class-validator";

export class DashboardPeriodoDto {
  @ApiPropertyOptional({
    example: "2026-05-01",
    description: "Data inicial do período (inclusiva).",
  })
  @IsOptional()
  @IsDateString()
  dataInicio?: string;

  @ApiPropertyOptional({
    example: "2026-05-31",
    description: "Data final do período (inclusiva).",
  })
  @IsOptional()
  @IsDateString()
  dataFim?: string;
}
