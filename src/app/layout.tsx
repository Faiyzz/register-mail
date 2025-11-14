// app/layout.tsx
import "./globals.css";
import { ReactNode } from "react";
import { NextAuthProvider } from "./providers";


export default function RootLayout({ children }: { children: ReactNode }) {
return (
<html lang="en">
<body>
<NextAuthProvider>
<div className="min-h-dvh w-full">
{children}
</div>
</NextAuthProvider>
</body>
</html>
);
}