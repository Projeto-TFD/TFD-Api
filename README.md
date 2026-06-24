# API Transporte de Pacientes

API REST em NestJS + TypeScript + Prisma + PostgreSQL baseada no esquema lógico de viagens, veículos, motoristas, pessoas e cidades.

## O que tem no projeto

- NestJS com Express por baixo
- PostgreSQL via Docker Compose
- Prisma ORM
- Validação global com `class-validator` e `ValidationPipe`
- Swagger em `/docs`
- Entidade `Pessoa` unificando paciente e acompanhante
- Histórico de pessoa/paciente
- Consulta de viagens por motorista e veículo
- Alerta de habilitação vencendo
- Seed com dados de exemplo

## Rodando com Docker

```bash
cp .env.example .env
docker compose up --build
```

A API fica em:

```text
http://localhost:3000/api
```

Swagger:

```text
http://localhost:3000/docs
```

## Autenticacao e front web

Faça login em:

```text
POST /api/auth/login
```

Corpo:

```json
{
  "email": "admin@local.com",
  "password": "admin123"
}
```

A resposta retorna `accessToken`. Todos os demais endpoints em `/api` exigem:

```http
Authorization: Bearer accessToken
```

Configure no `.env`:

```env
JWT_SECRET="gere-um-segredo-forte-e-longo"
JWT_EXPIRES_IN="8h"
CORS_ORIGINS="http://localhost:5173,https://seu-front.com"
ADMIN_EMAIL="admin@local.com"
ADMIN_PASSWORD="troque-essa-senha"
```

Em producao (`NODE_ENV=production`), a API nao sobe sem `JWT_SECRET` e `CORS_ORIGINS`.
O Swagger em `/docs` fica desabilitado em producao, exceto se `ENABLE_SWAGGER=true`.

Endpoints de usuarios, apenas para `ADMIN`:

```text
POST  /api/usuarios
GET   /api/usuarios
GET   /api/usuarios/:id
PATCH /api/usuarios/:id
PATCH /api/usuarios/:id/senha
```

PgAdmin:

```text
http://localhost:5050
email: admin@local.com
senha: admin
```

## Rodando localmente sem container da API

Suba apenas o banco:

```bash
docker compose up postgres -d
npm install
npx prisma migrate dev --name init
npm run prisma:seed
npm run start:dev
```

## Principais endpoints

### Pessoas

```text
POST   /api/pessoas
GET    /api/pessoas
GET    /api/pessoas/:id
GET    /api/pessoas/:id/historico
PATCH  /api/pessoas/:id
DELETE /api/pessoas/:id
```

### Veículos

```text
POST   /api/veiculos
GET    /api/veiculos
GET    /api/veiculos/:id
PATCH  /api/veiculos/:id
DELETE /api/veiculos/:id
```

### Motoristas

```text
POST   /api/motoristas
GET    /api/motoristas
GET    /api/motoristas/:id
GET    /api/motoristas/alertas/habilitacoes-vencendo?dias=30
PATCH  /api/motoristas/:id
DELETE /api/motoristas/:id
```

### Cidades

```text
POST   /api/cidades
GET    /api/cidades
GET    /api/cidades/:id
PATCH  /api/cidades/:id
DELETE /api/cidades/:id
```

### Viagens

```text
POST   /api/viagens
GET    /api/viagens
GET    /api/viagens/:id
GET    /api/viagens/motorista/:motoristaId
GET    /api/viagens/veiculo/:veiculoId
PATCH  /api/viagens/:id
DELETE /api/viagens/:id
```

## Exemplo de criação de viagem

```json
{
  "veiculoId": 1,
  "motoristaId": 1,
  "cidadeOrigemId": 1,
  "cidadeDestinoId": 2,
  "dataSaida": "2026-06-20T05:30:00.000Z",
  "dataEntrada": "2026-06-20T21:00:00.000Z",
  "observacao": "Consulta especializada",
  "pessoas": [
    {
      "pessoaId": 1,
      "tipoParticipacao": "PACIENTE"
    },
    {
      "pessoaId": 2,
      "tipoParticipacao": "ACOMPANHANTE"
    }
  ]
}
```

## Modelo lógico resumido

- `Pessoa`: guarda dados comuns de paciente e acompanhante.
- `ViagemPessoa`: define se a pessoa participou como `PACIENTE` ou `ACOMPANHANTE`.
- `Viagem`: concentra motorista, veículo, origem, destino, saída, entrada e participantes.
- `Motorista`: guarda CNH/RENACH/vínculo e permite alerta de validade.
- `Veiculo`: guarda placa, RENAVAM, ano e se é próprio ou locado.
- `Cidade`: origem e destino das viagens.
