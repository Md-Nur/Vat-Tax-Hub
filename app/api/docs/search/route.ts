import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q")?.trim();

    if (!q) {
      return NextResponse.json({ documents: [], total: 0 });
    }

    const searchTerms = q.split(/\s+/).filter(Boolean);
    const conditions = searchTerms.map((term) => ({
      OR: [
        { title: { contains: term, mode: "insensitive" as const } },
        { titleBn: { contains: term, mode: "insensitive" as const } },
        { description: { contains: term, mode: "insensitive" as const } },
        { descriptionBn: { contains: term, mode: "insensitive" as const } },
      ],
    }));

    const documents = await prisma.document.findMany({
      where: { AND: conditions },
      include: { category: true },
      orderBy: { views: "desc" },
      take: 50,
    });

    return NextResponse.json({ documents, total: documents.length });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
