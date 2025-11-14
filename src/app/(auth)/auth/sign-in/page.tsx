// app/(auth)/auth/sign-in/page.tsx
"use client";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";


export default function SignInPage() {
const router = useRouter();
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);


const onSubmit = async (e: FormEvent) => {
e.preventDefault();
setLoading(true); setError(null);
const res = await signIn("credentials", { email, password, redirect: false });
setLoading(false);
if (res?.ok) router.replace("/admin");
else setError("Invalid email or password");
};


return (
<div className="min-h-dvh grid place-items-center p-6">
<div className="card w-full max-w-md p-6">
<h1 className="text-2xl font-semibold">Welcome</h1>
<p className="text-sm text-neutral-400">Sign in to manage {process.env.NEXT_PUBLIC_APP_NAME ?? "domain email"}.</p>
<form onSubmit={onSubmit} className="mt-6 space-y-4">
<div>
<label className="label">Email</label>
<input className="input" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
</div>
<div>
<label className="label">Password</label>
<input className="input" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
</div>
{error && <p className="text-red-400 text-sm">{error}</p>}
<button className="btn w-full" disabled={loading}>{loading?"Signing in…":"Sign In"}</button>
</form>
</div>
</div>
);
}