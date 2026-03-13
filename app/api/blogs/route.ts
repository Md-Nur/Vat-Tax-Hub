import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "9");
    const category = searchParams.get("category") || "";

    const where: Record<string, unknown> = { published: true };
    if (category) {
      where.category = category;
    }

    const [blogs, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.blogPost.count({ where }),
    ]);

    // Get unique categories for filter
    const allCategories = await prisma.blogPost.findMany({
      where: { published: true },
      select: { category: true },
      distinct: ["category"],
      orderBy: { category: "asc" },
    });

    return NextResponse.json({
      blogs,
      total,
      page,
      totalPages: Math.ceil(total / limit),
      categories: allCategories.map((c: { category: string }) => c.category),
    });
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}
