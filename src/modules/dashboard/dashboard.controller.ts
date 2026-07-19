import { Controller, Get, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { DashboardPeriodoDto } from "./dashboard-periodo.dto";
import { DashboardService } from "./dashboard.service";

@ApiBearerAuth()
@ApiTags("Dashboard")
@Controller("dashboard")
export class DashboardController {
  constructor(private readonly service: DashboardService) {}

  @Get()
  findAll(@Query() periodo: DashboardPeriodoDto) {
    return this.service.findAll(periodo);
  }

  @Get("metricas")
  metricas(@Query() periodo: DashboardPeriodoDto) {
    return this.service.metricas(periodo);
  }
}
