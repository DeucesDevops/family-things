process.env.NODE_ENV = 'test';
process.env.JWT_SECRET = 'test-family-things-secret-change-me-before-production';
process.env.DATABASE_URL = process.env.DATABASE_URL ?? 'postgresql://familythings:familythings@localhost:55432/familythings?schema=public';
process.env.CORS_ALLOWED_ORIGINS = 'http://localhost:8081';
process.env.LOG_LEVEL = 'silent';
