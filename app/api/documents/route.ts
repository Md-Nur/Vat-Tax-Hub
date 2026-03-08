import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("categoryId");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;

    const where = categoryId ? { categoryId } : {};

    const [documents, total] = await Promise.all([
      prisma.document.findMany({
        where,
        include: { category: true },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.document.count({ where }),
    ]);

    return NextResponse.json({ documents, total, page, limit });
  } catch (error) {
    console.error("Documents fetch error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const admin = await requireAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const { title, titleBn, description, descriptionBn, categoryId, fileUrl, fileType, language } = body;

    if (!title || !categoryId || !fileUrl || !fileType) {
      return NextResponse.json(
        { error: "Title, categoryId, fileUrl, and fileType are required" },
        { status: 400 }
      );
    }

    const document = await prisma.document.create({
      data: {
        title,
        titleBn: titleBn || "",
        description,
        descriptionBn,
        categoryId,
        fileUrl,
        fileType,
        language: language || "en",
      },
    });

    return NextResponse.json({ document }, { status: 201 });
  } catch (error) {
    console.error("Document create error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
