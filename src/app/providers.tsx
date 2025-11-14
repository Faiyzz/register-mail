// app/providers.tsx
"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";


export function NextAuthProvider({ children }: { children: ReactNode }) {
return <SessionProvider>{children}</SessionProvider>;
}
```


```tsx
// app/page.tsx
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";


export default async function Home() {
const session = await getServerSession(authOptions);
if (session) redirect("/admin");
redirect("/auth/sign-in");
}