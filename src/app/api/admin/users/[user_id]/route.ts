import { NextResponse } from "next/server";
import type { ResultSetHeader } from "mysql2";
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
      return NextResponse.json({ error: "user not found" }, { status: 404 });
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

export async function DELETE(
  request: Request,
  { params }: { params: { user_id: string } }
) {
  try {
    const { user_id } = await params;

    console.log("In API", user_id);
    if (!user_id) {
      return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
    }

    const [queryResult] = (await pool.query(
      "DELETE FROM users WHERE user_id = ?",
      [user_id]
    )) as unknown as [ResultSetHeader];
    if (queryResult.affectedRows === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete user error:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
