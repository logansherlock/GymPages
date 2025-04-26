import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { equipment_id: number } }
) {
  try {
    const { equipment_id } = await params;
    const [rows] = await pool.query<any>(
      "SELECT equipment_name from equipment where equipment_id = ?",
      [equipment_id]
    );
    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Equipment not found" },
        { status: 404 }
      );
    }

    const { equipment_name } = rows[0];

    return NextResponse.json({ equipment_name }, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
