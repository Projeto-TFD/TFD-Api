import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PaginationDto } from '../../common/pagination.dto';
import { CreateMotoristaDto, UpdateMotoristaDto } from './dto';

@Injectable()
export class MotoristasService {
  constructor(private prisma: PrismaService) {}
  create(dto: CreateMotoristaDto) { return this.prisma.motorista.create({ data: { ...dto, validadeHabilitacao: new Date(dto.validadeHabilitacao) } }); }
  findAll({ page, limit }: PaginationDto) { return this.prisma.motorista.findMany({ skip: (page - 1) * limit, take: limit, orderBy: { nome: 'asc' } }); }
  async findOne(id: number) { const item = await this.prisma.motorista.findUnique({ where: { id } }); if (!item) throw new NotFoundException('Motorista não encontrado'); return item; }
  async update(id: number, dto: UpdateMotoristaDto) { await this.findOne(id); return this.prisma.motorista.update({ where: { id }, data: { ...dto, validadeHabilitacao: dto.validadeHabilitacao ? new Date(dto.validadeHabilitacao) : undefined } }); }
  async remove(id: number) { await this.findOne(id); return this.prisma.motorista.delete({ where: { id } }); }
  habilitacoesVencendo(dias = 30) { const limite = new Date(); limite.setDate(limite.getDate() + dias); return this.prisma.motorista.findMany({ where: { validadeHabilitacao: { lte: limite } }, orderBy: { validadeHabilitacao: 'asc' } }); }
}
