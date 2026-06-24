import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { AuthModule } from "./auth/auth.module";
import { JwtAuthGuard } from "./auth/jwt-auth.guard";
import { PrismaModule } from "./prisma/prisma.module";
import { PessoasModule } from "./modules/pessoas/pessoas.module";
import { VeiculosModule } from "./modules/veiculos/veiculos.module";
import { MotoristasModule } from "./modules/motoristas/motoristas.module";
import { CidadesModule } from "./modules/cidades/cidades.module";
import { ViagensModule } from "./modules/viagens/viagens.module";
import { UsuariosModule } from "./modules/usuarios/usuarios.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    PessoasModule,
    VeiculosModule,
    MotoristasModule,
    CidadesModule,
    ViagensModule,
    UsuariosModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
