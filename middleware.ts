import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/',                      // homepage
  '/api/webhooks/clerk',    // public webhook endpoint
]);

export default clerkMiddleware((auth, req) => {
  if (isPublicRoute(req)) return; // Skip auth for public routes
  // @ts-expect-error:mylifemyrules
  auth().protect();               // Require auth for everything else
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
