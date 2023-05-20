import { Ratelimit } from '@upstash/ratelimit';
import { redis } from './redis';

const cache = new Map();

export const rateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(10, '60 s'),
  analytics: true,
  ephemeralCache: cache,
});
