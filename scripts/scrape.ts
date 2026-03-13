import { PrismaClient } from "../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import * as cheerio from "cheerio";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🚀 Starting blog scraping process...");
  const blogs = await prisma.blogPost.findMany();
  
  for (const blog of blogs) {
    if (!blog.sourceUrl) {
      console.log(`⚠️ Skipping ${blog.slug}: No sourceUrl`);
      continue;
    }
    
    try {
      console.log(`⏳ Fetching: ${blog.sourceUrl}`);
      // Clean up the URL just in case
      const fixedUrl = blog.sourceUrl.replace("httpswww", "https://www").replace("http://url=", "");
      
      const res = await fetch(fixedUrl, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36"
        }
      });
      
      if (!res.ok) {
        console.error(`❌ Failed to fetch ${blog.slug}: ${res.status} ${res.statusText}`);
        continue;
      }
      
      const html = await res.text();
      const $ = cheerio.load(html);
      
      // Extract the entry content
      const entryContent = $('.entry-content');
      
      // Remove unwanted elements: scripts, styles, share buttons, read more buttons etc.
      entryContent.find('script').remove();
      entryContent.find('style').remove();
      entryContent.find('.sharedaddy').remove();
      entryContent.find('.jp-relatedposts').remove();
      
      const contentHtml = entryContent.html();
      
      if (contentHtml && contentHtml.trim().length > 0) {
        await prisma.blogPost.update({
          where: { id: blog.id },
          data: {
            content: contentHtml,
            contentBn: contentHtml,
          }
        });
        console.log(`✅ Successfully updated content for: ${blog.slug}`);
      } else {
        console.log(`❌ No .entry-content found for: ${blog.slug}`);
      }
    } catch (e: any) {
      console.error(`❌ Error scraping ${blog.slug}:`, e.message);
    }
    
    // Slight delay to avoid being blocked
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
    console.log("🏁 Scraping process completed.");
  });
