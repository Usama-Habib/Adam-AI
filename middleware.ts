import { authMiddleware } from "@clerk/nextjs";
 
const newLocal = "/dashboard";
export default authMiddleware({
  publicRoutes: ["/"]
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};