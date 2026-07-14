-- CreateEnum
CREATE TYPE "TipoVeiculo" AS ENUM ('PROPRIO', 'LOCADO');

-- CreateEnum
CREATE TYPE "TipoVinculoMotorista" AS ENUM ('EFETIVO', 'CONTRATADO', 'COMISSIONADO');

-- CreateEnum
CREATE TYPE "TipoParticipacao" AS ENUM ('PACIENTE', 'ACOMPANHANTE');

-- CreateEnum
CREATE TYPE "RoleUsuario" AS ENUM ('ADMIN', 'OPERADOR');

-- CreateTable
CREATE TABLE "usuarios" (
    "id_usuario" SERIAL NOT NULL,
    "nome" VARCHAR(160) NOT NULL,
    "email" VARCHAR(160) NOT NULL,
    "senha_hash" VARCHAR(180) NOT NULL,
    "role" "RoleUsuario" NOT NULL DEFAULT 'OPERADOR',
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id_usuario")
);

-- CreateTable
CREATE TABLE "veiculos" (
    "id_veiculo" SERIAL NOT NULL,
    "nome" VARCHAR(120) NOT NULL,
    "placa" VARCHAR(10) NOT NULL,
    "ano" INTEGER NOT NULL,
    "renavam" VARCHAR(20) NOT NULL,
    "tipo_veiculo" "TipoVeiculo" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "veiculos_pkey" PRIMARY KEY ("id_veiculo")
);

-- CreateTable
CREATE TABLE "motoristas" (
    "id_motorista" SERIAL NOT NULL,
    "nome" VARCHAR(160) NOT NULL,
    "cpf" VARCHAR(14) NOT NULL,
    "endereco" VARCHAR(255) NOT NULL,
    "renach" VARCHAR(30) NOT NULL,
    "validade_habilitacao" DATE NOT NULL,
    "tipo_habilitacao" VARCHAR(5) NOT NULL,
    "tipo_vinculo" "TipoVinculoMotorista" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "motoristas_pkey" PRIMARY KEY ("id_motorista")
);

-- CreateTable
CREATE TABLE "cidades" (
    "id_cidade" SERIAL NOT NULL,
    "nome" VARCHAR(120) NOT NULL,
    "uf" CHAR(2) NOT NULL,

    CONSTRAINT "cidades_pkey" PRIMARY KEY ("id_cidade")
);

-- CreateTable
CREATE TABLE "pessoas" (
    "id_pessoa" SERIAL NOT NULL,
    "nome" VARCHAR(160) NOT NULL,
    "cpf" VARCHAR(14),
    "cartao_sus" VARCHAR(20),
    "data_nascimento" DATE,
    "telefone" VARCHAR(20),
    "endereco" VARCHAR(255),
    "municipio" VARCHAR(120),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pessoas_pkey" PRIMARY KEY ("id_pessoa")
);

-- CreateTable
CREATE TABLE "viagens" (
    "id_viagem" SERIAL NOT NULL,
    "id_veiculo" INTEGER NOT NULL,
    "id_motorista" INTEGER NOT NULL,
    "id_cidade_origem" INTEGER NOT NULL,
    "id_cidade_destino" INTEGER NOT NULL,
    "data_saida" TIMESTAMP(3) NOT NULL,
    "data_entrada" TIMESTAMP(3),
    "observacao" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "viagens_pkey" PRIMARY KEY ("id_viagem")
);

-- CreateTable
CREATE TABLE "viagens_pessoas" (
    "id_viagem_pessoa" SERIAL NOT NULL,
    "id_viagem" INTEGER NOT NULL,
    "id_pessoa" INTEGER NOT NULL,
    "tipo_participacao" "TipoParticipacao" NOT NULL,
    "observacao" TEXT,

    CONSTRAINT "viagens_pessoas_pkey" PRIMARY KEY ("id_viagem_pessoa")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "veiculos_placa_key" ON "veiculos"("placa");

-- CreateIndex
CREATE UNIQUE INDEX "veiculos_renavam_key" ON "veiculos"("renavam");

-- CreateIndex
CREATE UNIQUE INDEX "motoristas_cpf_key" ON "motoristas"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "motoristas_renach_key" ON "motoristas"("renach");

-- CreateIndex
CREATE UNIQUE INDEX "cidades_nome_uf_key" ON "cidades"("nome", "uf");

-- CreateIndex
CREATE UNIQUE INDEX "pessoas_cpf_key" ON "pessoas"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "pessoas_cartao_sus_key" ON "pessoas"("cartao_sus");

-- CreateIndex
CREATE INDEX "viagens_data_saida_idx" ON "viagens"("data_saida");

-- CreateIndex
CREATE INDEX "viagens_id_motorista_data_saida_idx" ON "viagens"("id_motorista", "data_saida");

-- CreateIndex
CREATE INDEX "viagens_id_veiculo_data_saida_idx" ON "viagens"("id_veiculo", "data_saida");

-- CreateIndex
CREATE INDEX "viagens_pessoas_id_pessoa_idx" ON "viagens_pessoas"("id_pessoa");

-- CreateIndex
CREATE UNIQUE INDEX "viagens_pessoas_id_viagem_id_pessoa_tipo_participacao_key" ON "viagens_pessoas"("id_viagem", "id_pessoa", "tipo_participacao");

-- AddForeignKey
ALTER TABLE "viagens" ADD CONSTRAINT "viagens_id_veiculo_fkey" FOREIGN KEY ("id_veiculo") REFERENCES "veiculos"("id_veiculo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "viagens" ADD CONSTRAINT "viagens_id_motorista_fkey" FOREIGN KEY ("id_motorista") REFERENCES "motoristas"("id_motorista") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "viagens" ADD CONSTRAINT "viagens_id_cidade_origem_fkey" FOREIGN KEY ("id_cidade_origem") REFERENCES "cidades"("id_cidade") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "viagens" ADD CONSTRAINT "viagens_id_cidade_destino_fkey" FOREIGN KEY ("id_cidade_destino") REFERENCES "cidades"("id_cidade") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "viagens_pessoas" ADD CONSTRAINT "viagens_pessoas_id_viagem_fkey" FOREIGN KEY ("id_viagem") REFERENCES "viagens"("id_viagem") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "viagens_pessoas" ADD CONSTRAINT "viagens_pessoas_id_pessoa_fkey" FOREIGN KEY ("id_pessoa") REFERENCES "pessoas"("id_pessoa") ON DELETE RESTRICT ON UPDATE CASCADE;
