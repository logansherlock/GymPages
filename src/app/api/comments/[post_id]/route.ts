import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { post_id: number } }
) {
  try {
    const { post_id } = await params;
    const [rows] = await pool.query<any>(
      "SELECT comments.comment_id, comments.user_id, users.username, comments.body FROM comments " +
        "JOIN users on comments.user_id = users.user_id WHERE post_id = ?",
      [post_id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: "No comments" }, { status: 200 });
    }
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
