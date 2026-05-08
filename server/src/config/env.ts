import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().positive().default(8080),
  DATABASE_URL: z.string().url().default('postgresql://familythings:familythings@localhost:55432/familythings?schema=public'),
  REDIS_URL: z.string().url().optional(),
  JWT_SECRET: z.string().min(24).default('dev-family-things-secret-change-me-before-production'),
  JWT_TTL_MINUTES: z.coerce.number().int().positive().default(43200),
  BCRYPT_SALT_ROUNDS: z.coerce.number().int().min(8).max(15).default(12),
  CORS_ALLOWED_ORIGINS: z.string().default('http://localhost:8081,http://localhost:19006,http://127.0.0.1:8081'),
  COOKIE_DOMAIN: z.string().optional(),
  ENABLE_WORKERS: z.coerce.boolean().default(false),
  LOG_LEVEL: z.string().default('info'),
  SMTP_HOST: z.string().optional(),
  SMTP_PORT: z.coerce.number().int().positive().default(587),
  SMTP_USER: z.string().optional(),
  SMTP_PASSWORD: z.string().optional(),
  PUSH_PROVIDER: z.string().default('expo'),
  AI_PROVIDER: z.string().default('local'),
  WEATHER_API_KEY: z.string().optional(),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  // eslint-disable-next-line no-console
  console.error('Invalid environment configuration', parsed.error.flatten().fieldErrors);
  process.exit(1);
}

const rawEnv = parsed.data;

export const env = {
  ...rawEnv,
  isProduction: rawEnv.NODE_ENV === 'production',
  isTest: rawEnv.NODE_ENV === 'test',
  corsAllowedOrigins: rawEnv.CORS_ALLOWED_ORIGINS.split(',')
    .map((origin) => origin.trim())
    .filter(Boolean),
};

export type AppEnv = typeof env;
