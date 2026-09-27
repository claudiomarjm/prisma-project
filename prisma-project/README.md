# Projeto Prático — Prisma ORM + PostgreSQL + Docker

Projeto desenvolvido como atividade prática, utilizando **Node.js**, **Prisma ORM** e **PostgreSQL** rodando em um container **Docker**, substituindo o SQLite usado nas aulas iniciais.

## 🧱 Modelos de dados

O projeto implementa os modelos `Course` e `Module`, com um relacionamento **1:N** (um curso possui vários módulos):

```prisma
model Course {
  id          Int      @id @default(autoincrement())
  title       String
  description String?
  published   Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  modules     Module[]
}

model Module {
  id          Int      @id @default(autoincrement())
  title       String
  description String?
  order       Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  course      Course   @relation(fields: [courseId], references: [id], onDelete: Cascade)
  courseId    Int
}
```

## 🚀 Como rodar o projeto

### 1. Clonar o repositório
```bash
git clone <url-do-repositorio>
cd prisma-courses-project
```

### 2. Instalar as dependências
```bash
npm install
```

### 3. Subir o banco PostgreSQL com Docker
```bash
docker-compose up -d
```

### 4. Configurar as variáveis de ambiente
Copie o arquivo de exemplo:
```bash
cp .env.example .env
```

### 5. Rodar as migrações do Prisma
```bash
npx prisma migrate dev --name init
```

### 6. Gerar o Prisma Client
```bash
npx prisma generate
```

### 7. Executar o projeto
```bash
npm start
```

### 8. (Opcional) Visualizar os dados no Prisma Studio
```bash
npx prisma studio
```

## 🐳 Sobre o Docker

O `docker-compose.yml` sobe um container PostgreSQL 16, expondo a porta `5432`, com os dados persistidos em um volume Docker (`postgres_data`), garantindo que as informações não se percam ao reiniciar o container.

## 🛠️ Tecnologias utilizadas

- Node.js
- Prisma ORM
- PostgreSQL
- Docker / Docker Compose
