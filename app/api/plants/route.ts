import { NextResponse } from "next/server";
import { plantData } from "@/data/plants";

export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json(plantData);
}
