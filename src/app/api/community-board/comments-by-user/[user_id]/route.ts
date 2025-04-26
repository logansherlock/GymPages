import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { user_id: string } }
) {
  try {
    const { user_id } = await params;
    const [rows] = await pool.query<any>(
      "SELECT comments.comment_id, comments.post_id, comments.user_id, users.username, comments.body, comments.comment_date FROM comments " +
        "JOIN users on comments.user_id = users.user_id WHERE comments.user_id = ? ORDER BY comments.comment_date DESC",
      [user_id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: "Comments not found" }, { status: 404 });
    }

    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
