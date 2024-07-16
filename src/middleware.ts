import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define protected routes using createRouteMatcher
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',  // Protect all subroutes under /dashboard
  '/forum(.*)',      // Protect all subroutes under /forum
  '/admin(.*)',      // Protect all subroutes under /admin
]);

export default clerkMiddleware((auth, req) => {
  // Apply authentication protection to matched routes
  if (isProtectedRoute(req)) {
    auth().protect();
  }
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
