import { NextResponse } from "next/server";
import { projects } from "@/lib/data";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");
  const featured = searchParams.get("featured");

  if (slug) {
    const project = projects.find((p) => p.slug === slug);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json(project);
  }

  if (featured === "true") {
    return NextResponse.json(projects.filter((p) => p.featured));
  }

  return NextResponse.json(projects);
}
