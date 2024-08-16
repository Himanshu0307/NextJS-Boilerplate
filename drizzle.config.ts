import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config({
  path:".env.local",
})

export default defineConfig({
  schema: "./server/schema.ts",
  out: "./server/migrations",
  
  dialect: "postgresql", // 'postgresql' | 'mysql' | 'sqlite'
  dbCredentials: {
    host: process.env.PGHOST!,
    user: process.env.PGUSER!,
    password: process.env.PGPASSWORD!,
    database: process.env.PGDATABASE!,
    resourceArn:process.env.ENDPOINT_ID,
    ssl:'require'
    
  },
});
