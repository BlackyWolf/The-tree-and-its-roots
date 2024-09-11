// App
export const apiUrl = () => Deno.env.get("API_URL") || "";
export const appUrl = () => Deno.env.get("APP_URL") || "";

// Auth
export const hashLength = () => parseInt(Deno.env.get("HASH_LENGTH") || "");
export const hashSecret = () => Deno.env.get("HASH_SECRET") || "";
export const iterations = () => parseInt(Deno.env.get("ITERATIONS") || "");
export const memoryCost = () => parseInt(Deno.env.get("MEMORY_COST") || "");
export const parallelism = () => parseInt(Deno.env.get("PARALLELISM") || "");

// DB
export const dbUrl = () => Deno.env.get("DB_URL") || "";

// Environment
export const isProduction = () => Deno.env.get("ENV") === "production";
