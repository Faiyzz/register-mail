import { NextRequest, NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { hashPassword } from "../../../lib/password";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth";
import { z } from "zod";


const schema = z.object({ name: z.string().min(1), email: z.string().email(), password: z.string().min(8) });


export async function POST(req: NextRequest) {
const session = await getServerSession(authOptions);
if (!session || (session.user as any).role !== "ADMIN") {
return NextResponse.json({ ok: false, error: "Forbidden" }, { status: 403 });
}
const body = await req.json();
const parsed = schema.safeParse(body);
if (!parsed.success) {
return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
}
const { name, email, password } = parsed.data;
const hashed = await hashPassword(password);
const user = await prisma.user.create({ data: { name, email, hashedPassword: hashed, role: "USER" } });
return NextResponse.json({ ok: true, user });
}