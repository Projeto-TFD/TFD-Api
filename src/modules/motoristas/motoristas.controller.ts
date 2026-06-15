import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { PaginationDto } from "../../common/pagination.dto";
import { CreateMotoristaDto, UpdateMotoristaDto } from "./dto";
import { MotoristasService } from "./motoristas.service";

@ApiTags("Motoristas")
@Controller("motoristas")
export class MotoristasController {
  constructor(private readonly service: MotoristasService) {}
  @Post() create(@Body() dto: CreateMotoristaDto) {
    return this.service.create(dto);
  }
  @Get() findAll(@Query() query: PaginationDto) {
    return this.service.findAll(query);
  }
  @Get("alertas/habilitacoes-vencendo") habilitacoesVencendo(
    @Query("dias") dias?: string,
  ) {
    return this.service.habilitacoesVencendo(dias ? Number(dias) : 30);
  }
  @Get(":id") findOne(@Param("id", ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }
  @Patch(":id") update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateMotoristaDto,
  ) {
    return this.service.update(id, dto);
  }
  @Delete(":id") remove(@Param("id", ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
