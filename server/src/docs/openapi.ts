export const openApiDocument = {
  openapi: '3.0.3',
  info: {
    title: 'Family Things API',
    version: '1.0.0',
    description: 'Modular Express.js API for family onboarding, shared planning, reminders, wishes, and suggestions.',
  },
  servers: [{ url: '/api' }],
  security: [{ bearerAuth: [] }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  paths: {
    '/auth/register': {
      post: {
        security: [],
        summary: 'Register a user',
      },
    },
    '/auth/login': {
      post: {
        security: [],
        summary: 'Log in and receive a JWT',
      },
    },
    '/families': {
      post: {
        summary: 'Create a family and become its admin',
      },
    },
    '/families/join': {
      post: {
        summary: 'Join a family with an invite code',
      },
    },
    '/families/me': {
      get: {
        summary: 'Get the current user family',
      },
    },
    '/events': {
      get: {
        summary: 'List family events',
      },
      post: {
        summary: 'Create a family event',
      },
    },
    '/reminders': {
      get: {
        summary: 'List family reminders',
      },
      post: {
        summary: 'Create a family reminder',
      },
    },
    '/suggestions': {
      get: {
        summary: 'List family suggestions',
      },
      post: {
        summary: 'Create a suggestion',
      },
    },
    '/suggestions/{id}/vote': {
      post: {
        summary: 'Vote for a suggestion',
      },
    },
    '/wishes': {
      get: {
        summary: 'List wish drafts',
      },
      post: {
        summary: 'Create a wish draft',
      },
    },
  },
};
