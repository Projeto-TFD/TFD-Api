"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const crypto_1 = require("crypto");
const prisma = new client_1.PrismaClient();
function requireEnv(name) {
    const value = process.env[name];
    if (!value) {
        throw new Error(`${name} must be set`);
    }
    return value;
}
function hashPassword(password) {
    const salt = (0, crypto_1.randomBytes)(16).toString("hex");
    const hash = (0, crypto_1.scryptSync)(password, salt, 64).toString("hex");
    return `scrypt:${salt}:${hash}`;
}
async function main() {
    const nome = process.env.ADMIN_NAME ?? "Administrador";
    const email = requireEnv("ADMIN_EMAIL").toLowerCase();
    const password = requireEnv("ADMIN_PASSWORD");
    if (password.length < 8) {
        throw new Error("ADMIN_PASSWORD must be at least 8 characters");
    }
    const usuario = await prisma.usuario.upsert({
        where: { email },
        update: {
            nome,
            senhaHash: hashPassword(password),
            role: client_1.RoleUsuario.ADMIN,
            ativo: true,
        },
        create: {
            nome,
            email,
            senhaHash: hashPassword(password),
            role: client_1.RoleUsuario.ADMIN,
            ativo: true,
        },
    });
    console.log(`Admin ready: ${usuario.email}`);
}
main()
    .catch((error) => {
    console.error(error);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
//# sourceMappingURL=create-admin.js.map