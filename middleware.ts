import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for:
  // - API routes, _next internals, static files, images, fonts
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
