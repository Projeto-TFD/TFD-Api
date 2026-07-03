import { ArgumentsHost, ExceptionFilter } from "@nestjs/common";
import { Prisma } from "@prisma/client";
export declare class PrismaErrorFilter implements ExceptionFilter {
    catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost): void;
}
