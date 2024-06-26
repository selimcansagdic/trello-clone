
// import { NextResponse } from "next/server";
// import { authMiddleware,RedirectToSignIn  } from "@clerk/nextjs";




// export default authMiddleware({
//   // // publicRoutes: ["/"],
//   // // afterAuth ( auth: any, req:any)  {
//   // //   if (auth.userId && auth.isPublicRoute) {
//   // //     let path = "/select-org";

//   // //     if (auth.orgId) {
//   // //       path = `/organization/${auth.orgId}`;
//   // //     }

//   // //     const orgSelection = new URL(path, req.url);
//   // //     return NextResponse.redirect(orgSelection);
//   // //   }

//   // //   if (!auth.userId && !auth.isPublicRoute) {
//   // //     return RedirectToSignIn({ redirectUrl: req.url } )
//   // //   }

//   // //   if (auth.userId && !auth.orgId && req.nextUrl.pathname !== "/select-org") {
//   // //     const orgSelection = new URL("/select-org", req.url);
//   // //     return NextResponse.redirect(orgSelection);
//   // //   }
//   // },
// });

// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };



import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher(['/', 'api(/.*)?']);

export default clerkMiddleware((auth, req) => {
  if (isProtectedRoute(req)) {
    auth().protect();
  }
  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
