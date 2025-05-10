import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { post_id: number } }
) {
  try {
    const { post_id } = await params;
    const [rows] = await pool.query<any>(
      "SELECT comments.comment_id, comments.user_id, users.username, comments.body, comments.comment_date FROM comments " +
        "JOIN users on comments.user_id = users.user_id WHERE post_id = ? ORDER BY comments.comment_date ASC",
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

export async function POST(
  request: Request,
  { params }: { params: { post_id: string } }
) {
  try {
    const { post_id } = await params;
    const body = await request.json();
    const { user_id, body: commentBody } = body;

    if (!post_id || !user_id || !commentBody) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const [result] = await pool.query<any>(
      "INSERT INTO comments (post_id, user_id, body, comment_date) VALUES (?, ?, ?, NOW())",
      [post_id, user_id, commentBody]
    );
    return NextResponse.json(
      { message: "Comment created", post_id: result.insertId },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST error:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
