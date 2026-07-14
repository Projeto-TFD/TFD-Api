import { PrismaClient, RoleUsuario } from "@prisma/client";
import { randomBytes, scryptSync } from "crypto";

const prisma = new PrismaClient();

function requireEnv(name: string) {
  const value = process.env[name];

  if (!value) {
    throw new Error(`${name} must be set`);
  }

  return value;
}

function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");

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
    update: {},
    create: {
      nome,
      email,
      senhaHash: hashPassword(password),
      role: RoleUsuario.ADMIN,
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
