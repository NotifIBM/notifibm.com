import { Ratelimit } from '@upstash/ratelimit';
import { redis } from './redis';

export const rateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(2, '60 s'),
  analytics: true,
});
