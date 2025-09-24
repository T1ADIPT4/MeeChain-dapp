// Define database connection via the `DATABASE_URL` env var
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")//POSTGRES_URL="postgres://2d21971a3a2150beba1038a4ca5e8a805401198ddc9c81abbc7b090d083e3e05:sk_plNa2zUrZfK9luNji5Nf_@db.prisma.io:5432/postgres?sslmode=require"
}

// Define custom output path for generated Prisma Client
generator client {
  provider = "prisma-client-js"
  output   = "/app/generated/prisma-client"
}

// Example data model
model User {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  email     String   @unique
  name      String?
}
