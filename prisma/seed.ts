// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../lib/password";

const prisma = new PrismaClient();

async function main() {
  const email = "admin@funnelboy.com";
  const name = "Admin";
  const password = "Admin@123456"; // change in prod

  const hashed = await hashPassword(password);

  const admin = await prisma.user.upsert({
    where: { email },
    update: { role: "ADMIN" },
    create: {
      email,
      name,
      role: "ADMIN",
      hashedPassword: hashed,
    },
  });

  console.log("Seeded admin:", { email, password, role: admin.role });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
