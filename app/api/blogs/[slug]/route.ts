import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const blog = await prisma.blogPost.findUnique({
      where: { slug },
    });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Increment views
    await prisma.blogPost.update({
      where: { slug },
      data: { views: { increment: 1 } },
    });

    // Get related posts (same category, excluding current)
    const relatedPosts = await prisma.blogPost.findMany({
      where: {
        category: blog.category,
        id: { not: blog.id },
        published: true,
      },
      take: 3,
      orderBy: { views: "desc" },
      select: {
        id: true,
        title: true,
        titleBn: true,
        slug: true,
        excerpt: true,
        excerptBn: true,
        category: true,
        views: true,
        createdAt: true,
      },
    });

    return NextResponse.json({
      blog: { ...blog, views: blog.views + 1 },
      relatedPosts,
    });
  } catch (error) {
    console.error("Failed to fetch blog:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog" },
      { status: 500 }
    );
  }
}
