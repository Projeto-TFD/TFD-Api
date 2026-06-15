import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { PaginationDto } from "../../common/pagination.dto";
import { CreateViagemDto, UpdateViagemDto } from "./dto";

const includeCompleto = {
  veiculo: true,
  motorista: true,
  cidadeOrigem: true,
  cidadeDestino: true,
  pessoas: { include: { pessoa: true } },
};

@Injectable()
export class ViagensService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateViagemDto) {
    const saida = new Date(dto.dataSaida);
    const entrada = dto.dataEntrada ? new Date(dto.dataEntrada) : undefined;
    if (entrada && entrada < saida)
      throw new BadRequestException(
        "Data de entrada não pode ser anterior à saída.",
      );
    return this.prisma.viagem.create({
      data: {
        veiculoId: dto.veiculoId,
        motoristaId: dto.motoristaId,
        cidadeOrigemId: dto.cidadeOrigemId,
        cidadeDestinoId: dto.cidadeDestinoId,
        dataSaida: saida,
        dataEntrada: entrada,
        observacao: dto.observacao,
        pessoas: {
          create: dto.pessoas.map((p) => ({
            pessoaId: p.pessoaId,
            tipoParticipacao: p.tipoParticipacao,
            observacao: p.observacao,
          })),
        },
      },
      include: includeCompleto,
    });
  }

  findAll({ page, limit }: PaginationDto) {
    return this.prisma.viagem.findMany({
      skip: (page - 1) * limit,
      take: limit,
      include: includeCompleto,
      orderBy: { dataSaida: "desc" },
    });
  }

  async findOne(id: number) {
    const item = await this.prisma.viagem.findUnique({
      where: { id },
      include: includeCompleto,
    });
    if (!item) throw new NotFoundException("Viagem não encontrada");
    return item;
  }

  async update(id: number, dto: UpdateViagemDto) {
    await this.findOne(id);
    const saida = dto.dataSaida ? new Date(dto.dataSaida) : undefined;
    const entrada = dto.dataEntrada ? new Date(dto.dataEntrada) : undefined;
    if (saida && entrada && entrada < saida)
      throw new BadRequestException(
        "Data de entrada não pode ser anterior à saída.",
      );
    return this.prisma.$transaction(async (tx) => {
      if (dto.pessoas) {
        await tx.viagemPessoa.deleteMany({ where: { viagemId: id } });
      }
      return tx.viagem.update({
        where: { id },
        data: {
          veiculoId: dto.veiculoId,
          motoristaId: dto.motoristaId,
          cidadeOrigemId: dto.cidadeOrigemId,
          cidadeDestinoId: dto.cidadeDestinoId,
          dataSaida: saida,
          dataEntrada: entrada,
          observacao: dto.observacao,
          pessoas: dto.pessoas
            ? {
                create: dto.pessoas.map((p) => ({
                  pessoaId: p.pessoaId,
                  tipoParticipacao: p.tipoParticipacao,
                  observacao: p.observacao,
                })),
              }
            : undefined,
        },
        include: includeCompleto,
      });
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.viagem.delete({ where: { id } });
  }

  porMotorista(motoristaId: number) {
    return this.prisma.viagem.findMany({
      where: { motoristaId },
      include: includeCompleto,
      orderBy: { dataSaida: "desc" },
    });
  }

  porVeiculo(veiculoId: number) {
    return this.prisma.viagem.findMany({
      where: { veiculoId },
      include: includeCompleto,
      orderBy: { dataSaida: "desc" },
    });
  }
}
