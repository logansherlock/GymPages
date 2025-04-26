import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { gym_id: string } }
) {
  try {
    const { gym_id } = await params;
    const [rows] = await pool.query<any>(
      "SELECT posts.post_id, posts.user_id, users.username, posts.body, posts.photo_ref, " +
        "posts.likes, posts.post_date FROM posts JOIN users on posts.user_id = users.user_id " +
        "WHERE gym_id = ? ORDER BY posts.post_date DESC",
      [gym_id]
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

export async function POST(
  request: Request,
  { params }: { params: { gym_id: string } }
) {
  try {
    const { gym_id } = await params;
    const body = await request.json();
    const { user_id, body: postBody } = body;

    if (!gym_id || !user_id || !postBody) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const [result] = await pool.query<any>(
      "INSERT INTO posts (user_id, gym_id, body, post_date) VALUES (?, ?, ?, NOW())",
      [user_id, gym_id, postBody]
    );

    return NextResponse.json(
      { message: "Post created", post_id: result.insertId },
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
