import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { PasswordService } from "../../auth/password.service";
import {
  CreateUsuarioDto,
  UpdateUsuarioDto,
  UpdateUsuarioSenhaDto,
} from "./dto";

const usuarioSelect = {
  id: true,
  nome: true,
  email: true,
  role: true,
  ativo: true,
  createdAt: true,
  updatedAt: true,
};

@Injectable()
export class UsuariosService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly passwordService: PasswordService,
  ) {}

  create(dto: CreateUsuarioDto) {
    return this.prisma.usuario.create({
      data: {
        nome: dto.nome,
        email: dto.email.toLowerCase(),
        senhaHash: this.passwordService.hash(dto.password),
        role: dto.role ?? "OPERADOR",
      },
      select: usuarioSelect,
    });
  }

  findAll() {
    return this.prisma.usuario.findMany({
      orderBy: { nome: "asc" },
      select: usuarioSelect,
    });
  }

  async findOne(id: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id },
      select: usuarioSelect,
    });

    if (!usuario) {
      throw new NotFoundException("Usuario nao encontrado");
    }

    return usuario;
  }

  async update(id: number, dto: UpdateUsuarioDto) {
    await this.findOne(id);

    return this.prisma.usuario.update({
      where: { id },
      data: {
        nome: dto.nome,
        email: dto.email?.toLowerCase(),
        role: dto.role,
        ativo: dto.ativo,
        senhaHash: dto.password
          ? this.passwordService.hash(dto.password)
          : undefined,
      },
      select: usuarioSelect,
    });
  }

  async updateSenha(id: number, dto: UpdateUsuarioSenhaDto) {
    await this.findOne(id);

    return this.prisma.usuario.update({
      where: { id },
      data: {
        senhaHash: this.passwordService.hash(dto.password),
      },
      select: usuarioSelect,
    });
  }
}
