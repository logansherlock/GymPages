import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { post_id: string } }
) {
  try {
    const { post_id } = await params;
    const [rows] = await pool.query<any>(
      "SELECT posts.gym_id, posts.user_id, users.username, posts.body, posts.photo_ref, " +
        "posts.likes, posts.post_date FROM posts JOIN users on posts.user_id = users.user_id " +
        "WHERE post_id = ? LIMIT 1",
      [post_id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const { gym_id, user_id, username, body, photo_ref, likes, post_date } =
      rows[0];

    return NextResponse.json(
      { gym_id, user_id, username, body, photo_ref, likes, post_date },
      { status: 200 }
    );
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}


