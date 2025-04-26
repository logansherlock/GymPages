import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(request: Request) {
  try {
    const [rows] = await pool.query<any>(
      "SELECT exercise_id, exercise_name, motion, level, mechanic, related_equip_id, muscle_group, body, video_link FROM exercises ORDER BY exercise_name ASC"
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Exercise not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
 