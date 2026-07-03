"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    const cajazeiras = await prisma.cidade.upsert({
        where: { nome_uf: { nome: "Cajazeiras", uf: "PB" } },
        update: {},
        create: { nome: "Cajazeiras", uf: "PB" },
    });
    const joaoPessoa = await prisma.cidade.upsert({
        where: { nome_uf: { nome: "João Pessoa", uf: "PB" } },
        update: {},
        create: { nome: "João Pessoa", uf: "PB" },
    });
    const veiculo = await prisma.veiculo.upsert({
        where: { placa: "ABC1D23" },
        update: {},
        create: {
            nome: "Van Ducato",
            placa: "ABC1D23",
            ano: 2020,
            renavam: "12345678901",
            tipo: client_1.TipoVeiculo.PROPRIO,
        },
    });
    const motorista = await prisma.motorista.upsert({
        where: { cpf: "11122233344" },
        update: {},
        create: {
            nome: "José da Silva",
            cpf: "11122233344",
            endereco: "Rua Central, 100",
            renach: "RENACH123",
            validadeHabilitacao: new Date("2026-12-31"),
            tipoHabilitacao: "D",
            tipoVinculo: client_1.TipoVinculoMotorista.EFETIVO,
        },
    });
    const paciente = await prisma.pessoa.upsert({
        where: { cartaoSus: "898001234567890" },
        update: {},
        create: {
            nome: "Maria Paciente",
            cpf: "22233344455",
            cartaoSus: "898001234567890",
            dataNascimento: new Date("1980-05-10"),
            telefone: "83999990000",
            endereco: "Rua A",
            municipio: "Cajazeiras",
        },
    });
    const acompanhante = await prisma.pessoa.upsert({
        where: { cpf: "33344455566" },
        update: {},
        create: {
            nome: "Ana Acompanhante",
            cpf: "33344455566",
            telefone: "83988880000",
            endereco: "Rua B",
            municipio: "Cajazeiras",
        },
    });
    await prisma.viagem.create({
        data: {
            veiculoId: veiculo.id,
            motoristaId: motorista.id,
            cidadeOrigemId: cajazeiras.id,
            cidadeDestinoId: joaoPessoa.id,
            dataSaida: new Date("2026-06-20T05:30:00.000Z"),
            observacao: "Consulta especializada",
            pessoas: {
                create: [
                    {
                        pessoaId: paciente.id,
                        tipoParticipacao: client_1.TipoParticipacao.PACIENTE,
                    },
                    {
                        pessoaId: acompanhante.id,
                        tipoParticipacao: client_1.TipoParticipacao.ACOMPANHANTE,
                    },
                ],
            },
        },
    });
}
main().finally(async () => prisma.$disconnect());
//# sourceMappingURL=seed.js.map