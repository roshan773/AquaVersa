import { NextResponse } from "next/server";
import { fishData } from "@/data/fish";

export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json(fishData);
}
