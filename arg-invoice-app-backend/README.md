# Invoice App Backend

Backend API for invoice management application with user authentication and invoice CRUD operations. For detailed documentation covering entities, functions, use cases, and the project roadmap, see the [docs](docs/readme.md).

## Stack

- **Framework**: [NestJS](https://nestjs.com/) v11 with Fastify adapter
- **Language**: TypeScript 5.9
- **API**: GraphQL (GraphQL Yoga)
- **Database**: PostgreSQL 18
- **ORM**: Prisma v7
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcrypt
- **Build Tool**: SWC (Fast TypeScript/JavaScript compiler)
- **Code Quality**: Biome
- **Package Manager**: Yarn v4

## Prerequisites

- Node.js (v22 or higher recommended)
- Docker & Docker Compose

## Local Development Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd arg-invoice-app-backend
```

### 2. Install dependencies

```bash
corepack install
yarn install
```

### 3. Configure environment variables

Copy the `.env.dist` file to `.env`:

```bash
cp .env.dist .env
```

Edit `.env` and update the values as needed, or leave them as-is if you want to use the default values.

### 4. Start PostgreSQL database

```bash
docker-compose up -d
```

This will start a PostgreSQL container on port 5432.

### 5. Run database migrations

```bash
yarn prisma migrate dev
```

### 6. Generate Prisma client
```bash
yarn prisma generate
```

### 7. Start the development server

```bash
yarn start:dev
```

The API will be available at `http://localhost:3000/graphql`


## Available Scripts

- `yarn build` - Generate Prisma client and compile TypeScript to JavaScript
- `yarn start` - Start production server
- `yarn start:dev` - Start development server with hot reload
- `yarn types` - Run TypeScript type checking
- `yarn types:watch` - Run TypeScript type checking in watch mode

## GraphQL API

Once the server is running, you can access the GraphQL Playground at:

```
http://localhost:3000/graphql
```
