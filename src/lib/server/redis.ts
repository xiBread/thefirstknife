import { createClient } from "redis";
import { REDIS_URL } from "$env/static/private";

export const redis = await createClient({ url: REDIS_URL }).connect();

export type RedisClient = typeof redis;
