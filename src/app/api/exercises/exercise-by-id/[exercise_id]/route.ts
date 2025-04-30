import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { exercise_id: string } }
) {
  const { exercise_id } = await params;
  if (!exercise_id) {
    return NextResponse.json({ error: "Missing ID" }, { status: 400 });
  }
  try {
    const [rows] = await pool.query<any>(
      "SELECT exercise_name, motion, level, mechanic, related_equip_id, muscle_group, body, video_link FROM exercises WHERE exercise_id = ?",
      [exercise_id]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: "Exercise not found" },
        { status: 404 }
      );
    }

    const {
      exercise_name,
      motion,
      level,
      mechanic,
      related_equip_id,
      muscle_group,
      body,
      video_link,
    } = rows[0];

    return NextResponse.json(
      {
        exercise_name,
        motion,
        level,
        mechanic,
        related_equip_id,
        muscle_group,
        body,
        video_link,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
