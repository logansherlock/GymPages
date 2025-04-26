import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { user_id: string } }
) {
  try {
    const { user_id } = await params;
    const [rows] = await pool.query<any>(
      "SELECT posts.gym_id, users.username, posts.body, posts.photo_ref, " +
        "posts.likes, posts.post_date FROM posts JOIN users on posts.user_id = users.user_id " +
        "WHERE posts.user_id = ? ORDER BY posts.post_date DESC",
      [user_id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: "Posts not found" }, { status: 404 });
    }

    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
