import { Ratelimit } from '@upstash/ratelimit';
import { redis } from './redis';

export const rateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(15, '60 s'),
  analytics: true,
});
