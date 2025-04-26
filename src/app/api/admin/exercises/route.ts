import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await pool.query(
      "SELECT exercise_id, exercise_name, motion, level, mechanic FROM exercises"
    );
    console.log("Database response:", rows); // Debugging log
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      exercise_id,
      exercise_name,
      motion,
      level,
      mechanic,
      muscle_group,
      body: exerciseBody,
      video_link,
    } = body;

    let result;

    if (!exercise_id || !exercise_name || !muscle_group || !exerciseBody) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (!video_link) {
      [result] = await pool.query<any>(
        "INSERT INTO exercises (exercise_id, exercise_name, motion, level, mechanic, muscle_group, body) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          exercise_id,
          exercise_name,
          motion,
          level,
          mechanic,
          muscle_group,
          exerciseBody,
        ]
      );
    } else {
      [result] = await pool.query<any>(
        "INSERT INTO exercises (exercise_id, exercise_name, motion, level, mechanic, muscle_group, body, video_link) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [
          exercise_id,
          exercise_name,
          motion,
          level,
          mechanic,
          muscle_group,
          exerciseBody,
          video_link,
        ]
      );
    }
    return NextResponse.json(
      { message: "Post created", post_id: result.insertId },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json(
      { error: "Failed to create exercise" },
      { status: 500 }
    );
  }
}
