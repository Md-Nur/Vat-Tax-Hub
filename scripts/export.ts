import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { writeFileSync } from "fs";
import { join } from "path";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Exporting blogs to JSON...");
  const blogs = await prisma.blogPost.findMany();
  
  const targetPath = join(process.cwd(), "prisma", "blogs_data.json");
  writeFileSync(targetPath, JSON.stringify(blogs, null, 2));
  
  console.log(`✅ Saved ${blogs.length} blogs to ${targetPath}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
