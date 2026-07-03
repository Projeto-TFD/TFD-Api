"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const helmet_1 = __importDefault(require("helmet"));
const app_module_1 = require("./app.module");
function requireEnvironment() {
    const jwtSecret = process.env.JWT_SECRET;
    if (process.env.NODE_ENV === "production" && !jwtSecret) {
        throw new Error("JWT_SECRET must be set in production");
    }
    if (process.env.NODE_ENV === "production" &&
        jwtSecret &&
        jwtSecret.length < 32) {
        throw new Error("JWT_SECRET must be at least 32 characters in production");
    }
    if (process.env.NODE_ENV === "production" && !process.env.CORS_ORIGINS) {
        throw new Error("CORS_ORIGINS must be set in production");
    }
}
function getAllowedOrigins() {
    const configuredOrigins = process.env.CORS_ORIGINS?.split(",")
        .map((origin) => origin.trim())
        .filter(Boolean);
    if (configuredOrigins?.length) {
        return configuredOrigins;
    }
    return ["http://localhost:3000", "http://localhost:5173"];
}
async function bootstrap() {
    requireEnvironment();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix("api");
    app.use((0, helmet_1.default)());
    app.enableCors({
        origin: (origin, callback) => {
            if (!origin || getAllowedOrigins().includes(origin)) {
                callback(null, true);
                return;
            }
            callback(new Error("Origin not allowed by CORS"));
        },
        credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"],
        methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    const config = new swagger_1.DocumentBuilder()
        .setTitle("API Transporte de Pacientes")
        .setDescription("Controle de viagens, veículos, motoristas, cidades, pacientes e acompanhantes.")
        .setVersion("1.0.0")
        .addBearerAuth()
        .build();
    if (process.env.NODE_ENV !== "production" ||
        process.env.ENABLE_SWAGGER === "true") {
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        document.security = [{ bearer: [] }];
        swagger_1.SwaggerModule.setup("docs", app, document);
    }
    await app.listen(process.env.PORT ? Number(process.env.PORT) : 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map