import { Module } from "@nestjs/common";
import { CidadesController } from "./cidades.controller";
import { CidadesService } from "./cidades.service";
@Module({ controllers: [CidadesController], providers: [CidadesService] })
export class CidadesModule {}
