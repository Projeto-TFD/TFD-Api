import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '../../common/pagination.dto';
import { CreateVeiculoDto, UpdateVeiculoDto } from './dto';
import { VeiculosService } from './veiculos.service';

@ApiTags('Veículos')
@Controller('veiculos')
export class VeiculosController {
  constructor(private readonly service: VeiculosService) {}
  @Post() create(@Body() dto: CreateVeiculoDto) { return this.service.create(dto); }
  @Get() findAll(@Query() query: PaginationDto) { return this.service.findAll(query); }
  @Get(':id') findOne(@Param('id', ParseIntPipe) id: number) { return this.service.findOne(id); }
  @Patch(':id') update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateVeiculoDto) { return this.service.update(id, dto); }
  @Delete(':id') remove(@Param('id', ParseIntPipe) id: number) { return this.service.remove(id); }
}
