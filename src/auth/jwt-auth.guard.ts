import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import type { Request } from "express";
import { AuthenticatedUser } from "./auth.types";
import { JwtService } from "./jwt.service";
import { IS_PUBLIC_KEY } from "./public.decorator";
import { ROLES_KEY } from "./roles.decorator";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context
      .switchToHttp()
      .getRequest<Request & { user?: AuthenticatedUser }>();
    const token = this.extractBearerToken(request.header("authorization"));

    if (!token) {
      throw new UnauthorizedException("Missing bearer token");
    }

    const payload = this.jwtService.verify(token);
    request.user = {
      id: payload.sub,
      nome: payload.nome,
      email: payload.email,
      role: payload.role,
    };

    const roles = this.reflector.getAllAndOverride<AuthenticatedUser["role"][]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (roles?.length && !roles.includes(request.user.role)) {
      throw new ForbiddenException("Acesso negado");
    }

    return true;
  }

  private extractBearerToken(authHeader?: string) {
    if (!authHeader) {
      return null;
    }

    const [scheme, token] = authHeader.split(" ");
    return scheme?.toLowerCase() === "bearer" && token ? token : null;
  }
}
