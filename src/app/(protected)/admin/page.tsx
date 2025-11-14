// app/(protected)/admin/page.tsx
e.preventDefault();
setMsg(null);
const res = await fetch("/api/email-accounts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(mailForm),
});
const j = await res.json();
setMsg(j.ok ? "Mailbox created." : j.error || "Failed");
if (j.ok) setMailForm({ email: "", password: "" });
}


return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
        <header className="flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-semibold">Control Center</h1>
                <p className="text-sm text-neutral-400">Logged in as <span className="font-medium">{data?.user?.email}</span> · <span className="uppercase text-xs tracking-wide">{role}</span></p>
            </div>
            <button className="btn" onClick={() => signOut({ callbackUrl: "/auth/sign-in" })}>Sign out</button>
        </header>


        <div className="grid gap-6 md:grid-cols-2">
            <Section title="Create Mailbox" desc="Register a new email for your domain (e.g. name@funnelboy.com)">
                <form className="space-y-3" onSubmit={createMailbox}>
                    <div>
                        <label className="label">Email address</label>
                        <input className="input" placeholder={`user@${process.env.APP_DOMAIN ?? "example.com"}`} value={mailForm.email} onChange={(e) => setMailForm(v => ({ ...v, email: e.target.value }))} required />
                    </div>
                    <div>
                        <label className="label">Password</label>
                        <input className="input" type="password" value={mailForm.password} onChange={(e) => setMailForm(v => ({ ...v, password: e.target.value }))} required />
                    </div>
                    <button className="btn w-full">Create Mailbox</button>
                </form>
            </Section>


            <Section title="Add App User" desc="Give another teammate access to create mailboxes.">
                <form className="space-y-3" onSubmit={createUser}>
                    <div>
                        <label className="label">Name</label>
                        <input className="input" value={userForm.name} onChange={(e) => setUserForm(v => ({ ...v, name: e.target.value }))} required />
                    </div>
                    <div>
                        <label className="label">Email</label>
                        <input className="input" type="email" value={userForm.email} onChange={(e) => setUserForm(v => ({ ...v, email: e.target.value }))} required />
                    </div>
                    <div>
                        <label className="label">Password</label>
                        <input className="input" type="password" value={userForm.password} onChange={(e) => setUserForm(v => ({ ...v, password: e.target.value }))} required />
                    </div>
                    <button className="btn w-full">Create User</button>
                </form>
            </Section>
        </div>


        {msg && <p className="text-sm text-green-400">{msg}</p>}
    </div>
);
