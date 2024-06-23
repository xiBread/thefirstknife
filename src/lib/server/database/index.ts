import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { DATABASE_URL } from "$env/static/private";
import { sessions, users } from "./schema";

const client = postgres(DATABASE_URL);

export const db = drizzle(client);
export const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);

export * from "./schema";
