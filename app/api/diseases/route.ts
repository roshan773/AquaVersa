import { NextResponse } from "next/server";
import { diseasesData } from "@/data/diseases";

export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json(diseasesData);
}
