import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  const blogs = await prisma.blogPost.findMany({ select: { slug: true, content: true } });
  console.log(`Found ${blogs.length} blogs.`);
  const sample = blogs.find(b => b.content !== null);
  console.log(`Sample content length for ${sample?.slug}:`, sample?.content?.length);
  console.log("Sample excerpt:", sample?.content?.substring(0, 150));
}

main().catch(console.error).finally(() => prisma.$disconnect());
