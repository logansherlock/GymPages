import { NextResponse } from "next/server";
import pool from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: { user_id: string } }
) {
  try {
    const { user_id } = await params;
    const [rows] = await pool.query<any>(
      "SELECT email, firstname, lastname, username, gym_member FROM users WHERE user_id = ?",
      [user_id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const { email, firstname, lastname, username, gym_member } = rows[0];

    return NextResponse.json(
      { email, firstname, lastname, username, gym_member },
      { status: 200 }
    );
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
