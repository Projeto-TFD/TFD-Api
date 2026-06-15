import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '../../common/pagination.dto';
import { CreatePessoaDto, UpdatePessoaDto } from './dto';
import { PessoasService } from './pessoas.service';
@ApiTags('Pessoas')
@Controller('pessoas')
export class PessoasController {
  constructor(private readonly service: PessoasService) {}
  @Post() create(@Body() dto: CreatePessoaDto) { return this.service.create(dto); }
  @Get() findAll(@Query() query: PaginationDto) { return this.service.findAll(query); }
  @Get(':id/historico') historico(@Param('id', ParseIntPipe) id: number) { return this.service.historico(id); }
  @Get(':id') findOne(@Param('id', ParseIntPipe) id: number) { return this.service.findOne(id); }
  @Patch(':id') update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePessoaDto) { return this.service.update(id, dto); }
  @Delete(':id') remove(@Param('id', ParseIntPipe) id: number) { return this.service.remove(id); }
}
