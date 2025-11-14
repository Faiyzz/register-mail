import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth";
import { z } from "zod";


const schema = z.object({ email: z.string().email(), password: z.string().min(8) });


export async function POST(req: NextRequest) {
const session = await getServerSession(authOptions);
if (!session || !["ADMIN", "USER"].includes((session.user as any).role)) {
return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
}
const data = await req.json();
const parsed = schema.safeParse(data);
if (!parsed.success) return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });


const { email, password } = parsed.data;
const created = await prisma.emailAccount.create({
data: {
email,
mailboxPassword: password, // In production, consider encrypting or delegating to SMTP API.
createdById: (session.user as any).id,
},
});
return NextResponse.json({ ok: true, emailAccount: created });
}