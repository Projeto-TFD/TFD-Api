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
import { CidadesService } from "./cidades.service";
import { CreateCidadeDto, UpdateCidadeDto } from "./dto";
@ApiTags("Cidades")
@Controller("cidades")
export class CidadesController {
  constructor(private readonly service: CidadesService) {}
  @Post() create(@Body() dto: CreateCidadeDto) {
    return this.service.create(dto);
  }

  @Get() findAll(@Query() query: PaginationDto) {
    return this.service.findAll(query);
  }

  @Get(":id") findOne(@Param("id", ParseIntPipe) id: number) {
    return this.service.findOne(id);
  }

  @Patch(":id") update(
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateCidadeDto,
  ) {
    return this.service.update(id, dto);
  }

  @Delete(":id") remove(@Param("id", ParseIntPipe) id: number) {
    return this.service.remove(id);
  }
}
