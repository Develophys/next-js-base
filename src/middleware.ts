export { default } from "next-auth/middleware";

export const config = { matcher: ["/products"] };

// import { withAuth } from "next-auth/middleware"

// export default withAuth(
//   function middleware(_req) {
//   },
//   {
//     callbacks: {
//       authorized: ({ req, token }) => {
//         if (
//           (req.nextUrl.pathname.startsWith('/products') || req.nextUrl.pathname.startsWith('/api')) &&
//           token === null
//         ) {
//           return false
//         }
//         return true
//       }
//     }
//   }
// )