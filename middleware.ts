// middleware.ts
import { withAuth } from "next-auth/middleware";


export default withAuth({
callbacks: {
authorized: ({ token, req }) => {
const url = new URL(req.url);
if (url.pathname.startsWith("/admin")) {
return token?.role === "ADMIN" || token?.role === "USER"; // both can access admin page to create mailboxes
}
return true;
},
},
});


export const config = {
matcher: ["/admin/:path*"],
};