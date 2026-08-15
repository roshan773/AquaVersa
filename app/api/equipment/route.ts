import { NextResponse } from "next/server";
import { equipmentData } from "@/data/equipment";

export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json(equipmentData);
}
