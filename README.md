# TBE-Tarefa1

Projeto desenvolvido utilizando Node.js, TypeScript, Express, PostgreSQL e Prisma para a Tarefa 1 da disciplina Tecnologias Back-End, com a implementação de um Catálogo de Editais de Monitoria (CRUD + banco de dados via Docker).

## Tecnologias

- Node.js + TypeScript
- Express
- PostgreSQL 15 (Docker / Docker Compose)
- Prisma ORM (migrations + seed + Prisma Studio)
- Insomnia (testes dos endpoints)

## Modelo de dados (Prisma)

Modelo `Edital` (análogo ao `Product` pedido no enunciado):

| Campo             | Tipo         | Observação                                   |
|-------------------|--------------|-----------------------------------------------|
| id                | Int          | `@id @default(autoincrement())`               |
| disciplina        | String       | mapeado para a coluna `title`                 |
| descricao         | String (Text)| mapeado para a coluna `description`           |
| professor         | String       | nome do professor responsável                 |
| curso             | String       | curso ao qual a disciplina pertence           |
| vagas             | Int          | número de vagas ofertadas                     |
| dataAbertura      | DateTime     | abertura das inscrições                       |
| dataEncerramento  | DateTime     | encerramento das inscrições                   |
| status            | Enum         | `ABERTO` ou `ENCERRADO`                       |
| destaque          | Boolean      | edital em destaque no catálogo                |
| createdAt         | DateTime     | `@default(now())`                             |
| updatedAt         | DateTime     | `@updatedAt`                                  |

## Endpoints

| Método | Rota            | Descrição                                      |
|--------|-----------------|--------------------------------------------------|
| GET    | `/`             | Status da API (`{ "status": "ok" }`)             |
| GET    | `/editais`      | Lista todos os editais                           |
| GET    | `/editais/:id`  | Retorna um edital por id (404 se não encontrado) |
| POST   | `/editais`      | Cria um novo edital (opcional)                   |
| PUT    | `/editais/:id`  | Atualiza um edital existente (opcional)          |
| DELETE | `/editais/:id`  | Remove um edital (opcional)                      |

## Como rodar do zero

### Pré-requisitos

- Node.js 18+
- Docker e Docker Compose

### Passo a passo

1. **Clone o repositório e instale as dependências**

   ```bash
   git clone https://github.com/tadeujeronimo/TBE-Tarefa1
   cd TBE-Tarefa1
   npm install
   ```

2. **Configure as variáveis de ambiente**

   ```bash
   cp .env.example .env
   ```

   O arquivo `.env` já vem com valores padrão compatíveis com o
   `docker-compose.yml`. Ajuste se quiser usar outras credenciais.

3. **Suba o banco PostgreSQL com Docker Compose**

   ```bash
   docker compose up -d
   ```

   Isso cria um container `catalogo-editais-db` com PostgreSQL 15,
   expõe a porta `5432` e persiste os dados em um volume Docker.

4. **Gere o Prisma Client e rode a migration inicial**

   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

5. **Popule o banco com os editais de exemplo (seed)**

   ```bash
   npm run seed
   ```

   Isso insere 6 editais de monitoria reais (mesmos dados usados no
   protótipo de front-end do TCC).

6. **(Opcional) Verifique os dados no Prisma Studio**

   ```bash
   npx prisma studio
   ```

7. **Inicie a API em modo desenvolvimento**

   ```bash
   npm run dev
   ```

   A API sobe em `http://localhost:3333`.

8. **Teste os endpoints com Insomnia**

   Importe o arquivo `insomnia/Insomnia_Editais.json` no Insomnia
   (`Application` → `Preferences` → `Data` → `Import Data`, ou
   `Import/Export` dentro do workspace) e execute as requisições:

   - `GET /`
   - `GET /editais`
   - `GET /editais/:id`

## Scripts disponíveis

| Script                  | Comando                          | Descrição                                  |
|-------------------------|-----------------------------------|---------------------------------------------|
| `npm run dev`           | `tsx watch src/server.ts`         | Roda a API em modo desenvolvimento          |
| `npm run build`         | `tsc`                             | Compila o TypeScript para `dist/`           |
| `npm start`             | `node dist/server.js`             | Roda a API já compilada                     |
| `npm run seed`          | `tsx prisma/seed.ts`              | Executa o seed do banco via TSX             |
| `npm run prisma:migrate`| `prisma migrate dev`              | Atalho para criar/aplicar migrations        |
| `npm run prisma:generate`| `prisma generate`                | Gera o Prisma Client                        |
| `npm run prisma:studio` | `prisma studio`                   | Abre o Prisma Studio                        |

## Estrutura de pastas

```
TBE-Tarefa1/
├── docker-compose.yml
├── .env.example
├── package.json
├── tsconfig.json
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── insomnia/
│   └── Insomnia_Editais.json
└── src/
    ├── app.ts
    ├── server.ts
    ├── prisma.ts
    ├── controllers/
    │   └── edital.controller.ts
    └── routes/
        └── edital.routes.ts
```

## Autor

- **Nome**: Tadeu dos Santos Jerônimo
- **Matrícula**: 2026202194
- **E-mail**: tadeus.jeronimo@gmail.com
- **Disciplina**: Tecnologias Front-End - IF Sudeste/MG