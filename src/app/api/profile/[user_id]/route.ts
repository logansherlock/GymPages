import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { user_id: number } }
) {
  try {
    const { user_id } = await params;

    const [rows] = await pool.query<any>(
      "SELECT visibility, max_bench, max_squat, max_dead FROM profiles WHERE user_id = ?",
      [user_id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }
    const { visibility, max_bench, max_squat, max_dead } = rows[0];

    return NextResponse.json(
      { visibility, max_bench, max_squat, max_dead },
      { status: 200 }
    );
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
