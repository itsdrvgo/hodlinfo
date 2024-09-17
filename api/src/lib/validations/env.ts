import { z } from "zod";

export const envSchema = z.object({
    PORT: z.string().default("3001"),

    DATABASE_URL: z
        .string()
        .url()
        .regex(/mongodb/),
    DB_PROTOCOL: z.string(),
    DB_USERNAME: z.string(),
    DB_PASSWORD: z.string(),
    DB_HOST: z.string(),
    DB_NAME: z.string(),

    FRONTEND_URL: z.string().url(),
    BACKEND_URL: z.string().url(),

    WAZIRX_BASE_URL: z.string().url(),
});

export type EnvData = z.infer<typeof envSchema>;
