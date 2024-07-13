import { Tokens } from "./server/auth";
import { useStorage } from "./storage.svelte";

export const tokens = useStorage<Partial<Tokens>>("bungie_tokens", {});
