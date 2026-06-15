import { ArgumentsHost, Catch, ConflictException, ExceptionFilter, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaErrorFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    if (exception.code === 'P2002') throw new ConflictException('Registro duplicado em campo único.');
    if (exception.code === 'P2025') throw new NotFoundException('Registro não encontrado.');
    response.status(400).json({ message: exception.message, code: exception.code });
  }
}
