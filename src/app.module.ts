import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "./prisma/prisma.module";
import { PessoasModule } from "./modules/pessoas/pessoas.module";
import { VeiculosModule } from "./modules/veiculos/veiculos.module";
import { MotoristasModule } from "./modules/motoristas/motoristas.module";
import { CidadesModule } from "./modules/cidades/cidades.module";
import { ViagensModule } from "./modules/viagens/viagens.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    PessoasModule,
    VeiculosModule,
    MotoristasModule,
    CidadesModule,
    ViagensModule,
  ],
})
export class AppModule {}
