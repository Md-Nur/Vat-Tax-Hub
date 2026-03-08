import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { requireAdmin } from "@/lib/auth";

export async function POST(request: Request) {
  const admin = await requireAdmin(request);
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const docsDir = join(process.cwd(), "public", "docs");
    await mkdir(docsDir, { recursive: true });

    const fileName = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
    const filePath = join(docsDir, fileName);
    await writeFile(filePath, buffer);

    return NextResponse.json({
      fileUrl: `/docs/${fileName}`,
      fileName,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
