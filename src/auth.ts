import NextAuth, { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/prisma";
import { verifyPassword } from "./lib/password";
import { z } from "zod";


export const authOptions = {
adapter: PrismaAdapter(prisma),
session: { strategy: "database" },
pages: { signIn: "/auth/sign-in" },
providers: [
Credentials({
name: "Credentials",
credentials: {
email: { label: "Email", type: "email" },
password: { label: "Password", type: "password" },
},
authorize: async (creds) => {
const schema = z.object({ email: z.string().email(), password: z.string().min(8) });
const parsed = schema.safeParse(creds);
if (!parsed.success) return null;
const { email, password } = parsed.data;


const user = await prisma.user.findUnique({ where: { email } });
if (!user || !user.hashedPassword) return null;
const ok = await verifyPassword(user.hashedPassword, password);
if (!ok) return null;
return { id: user.id, email: user.email, name: user.name, role: user.role } as any;
},
}),
],
callbacks: {
async session({ session, token, user }) {
// with database strategy, `user` is available
if (user) {
(session.user as any).id = user.id;
(session.user as any).role = (user as any).role;
}
return session;
},
},
} satisfies NextAuthConfig;


export const { handlers, auth } = NextAuth(authOptions);