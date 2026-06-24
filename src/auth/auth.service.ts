import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { JwtService } from "./jwt.service";
import { PasswordService } from "./password.service";
import { LoginDto } from "./dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
  ) {}

  async login(dto: LoginDto) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { email: dto.email.toLowerCase() },
    });

    if (!usuario || !usuario.ativo) {
      throw new UnauthorizedException("Credenciais invalidas");
    }

    const validPassword = this.passwordService.verify(
      dto.password,
      usuario.senhaHash,
    );

    if (!validPassword) {
      throw new UnauthorizedException("Credenciais invalidas");
    }

    const token = this.jwtService.sign({
      sub: usuario.id,
      nome: usuario.nome,
      email: usuario.email,
      role: usuario.role,
    });

    return {
      ...token,
      tokenType: "Bearer",
      user: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        role: usuario.role,
      },
    };
  }
}
