import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET(request: Request) {
  const admin = await requireAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const [totalDocuments, totalCategories, totalUsers, viewsResult] = await Promise.all([
      prisma.document.count(),
      prisma.category.count(),
      prisma.user.count(),
      prisma.document.aggregate({ _sum: { views: true } }),
    ]);

    return NextResponse.json({
      totalDocuments,
      totalCategories,
      totalUsers,
      totalViews: viewsResult._sum.views || 0,
    });
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
