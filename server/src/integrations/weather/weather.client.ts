import { env } from '../../config/env';

export const weatherClient = {
  async getPlanningSummary(location?: string) {
    if (!env.WEATHER_API_KEY || !location) {
      return {
        available: false,
        summary: 'Weather integration is not configured yet.',
      };
    }

    return {
      available: true,
      summary: `Weather lookup for ${location} is ready to be wired to the configured provider.`,
    };
  },
};
