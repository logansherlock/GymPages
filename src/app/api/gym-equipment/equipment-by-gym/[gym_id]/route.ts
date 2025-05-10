import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { gym_id: string } }
) {
  const { gym_id } = await params;
  if (!gym_id) {
    return NextResponse.json({ error: "Missing ID" }, { status: 400 });
  }
  try {
    const [rows] = await pool.query<any>(
      "SELECT equipment.equipment_name FROM gym_equipment JOIN equipment ON gym_equipment.equipment_id = equipment.equipment_id WHERE gym_id = ?",
      [gym_id]
    );
    if (rows.length === 0) {
      return NextResponse.json({ error: "Equipment not found" }, { status: 404 });
    }

    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
