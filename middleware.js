import { NextResponse } from 'next/server';
import { rateLimiter } from './lib/rate-limiter';

export default async function middleware(req) {
  // const { pathname } = req.nextUrl;
  // console.log(`Request from ${ip} to ${pathname}`);
  const ip = req.ip ?? req?.connection?.remoteAddress ?? 'Anonymous';
  try {
    const identifier = `ip_${ip}`;
    const { success, limit, remaining } = await rateLimiter.limit(identifier);
    if (!success) {
      return NextResponse.rewrite('https://notifibm/api/rate-limit');
    }
    const requestHeaders = new Headers();
    requestHeaders.set('X-RateLimit-Limit', limit);
    requestHeaders.set('X-RateLimit-Remaining', remaining);

    return NextResponse.next({
      headers: requestHeaders,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.error(new Error('Something went wrong!'));
  }
}

export const config = {
  matcher: '/api/gpa/:path*',
};
